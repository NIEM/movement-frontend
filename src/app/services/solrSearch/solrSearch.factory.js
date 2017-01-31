'use strict';

/**
 * @ngdoc factory
 *
 * @name solrSearch
 *
 * @description
 * Factory for Solr Search
 */
(function () {

  angular
    .module('dhsniem')
    .factory('solrSearch', solrSearch);

  function solrSearch($location, $rootScope, solrRequest, $window) {

    var docs;
    var numFound;

    var facets = {
      'domain': {},
      'externalStandard': {},
      'otherNamespace': {}
    };

    return {
      getDocs: getDocs,
      getNumFound: getNumFound,
      getQuery: getQuery,
      getSort: getSort,
      getFacet: getFacet,
      getSelectedFacets: getSelectedFacets,
      search: search,
      clearAllFilters: clearAllFilters
    };


    /* 
    * Getters - used to extract data from $location service and handle logic.
    */
    function getDocs() {
      return docs;
    }

    function getNumFound() {
      return numFound;
    }

    function getQuery() {
      return $location.search().q || '*';
    }

    function getSort() {
      return $location.search().sortBy || 'namespacePriority asc';
    }

    function getPage() {
      return $location.search().page || '1';
    }

    function getFacet(facetField) {
      return facets[facetField];
    }

    function getSelectedFacets() {
      var selected = $location.search().selectedFacets;
      var selectedFacets = [];

      if (angular.isArray(selected)) {
        selectedFacets = selected;
      } else if (selected) {
        selectedFacets.push(selected);
      }
      return selectedFacets;
    }


    /**
     * @name search
     *
     * @memberof dhsniem.service:solrSearch
     *
     * @description Performs the solr search via call to the http method. On success, sets response data to the service variables.
     */
    function search() {
      solrRequest.makeSolrRequest(buildSearchParams()).then(function(data) {
        docs = data.response.docs;
        numFound = data.response.numFound;
        facets = data.facet_counts.facet_fields;
        $rootScope.$emit('newSearch');
      });
      $window.document.title = getQuery() + ' - CCP Search';
    }


    /**
     * @name clearAllFilters
     *
     * @memberof dhsniem.service:solrSearch
     *
     * @description Clears any selected facets (filters) and calls a new search.
     *
     * @param exception - a filter to keep for use with typeahead
     */
    function clearAllFilters(exception) {
      var selectedFacets = [];
      if (exception) {
        selectedFacets.push(exception);
      }
      $location.search('selectedFacets', selectedFacets);
      $location.search('page', 1);
      search();
    }

 
    /**
     * @name buildSearchParams
     *
     * @memberof dhsniem.service:solrSearch
     *
     * @description Dynamically builds the search params for a jsonp $http request to the solr instance.
     *
     * @returns {Object} The params object
     */
    function buildSearchParams() {
      var params = {
        'q': getQuery(),
        'sort': getSort(),
        'facet': 'on',
        'facet.mincount': '1',
        'wt': 'json',
        'json.wrf': 'JSON_CALLBACK',
        'json.nl': 'map',
        'facet.field': getFacetFields(),
        'fq': groupSelectedFacets(),
        'rows': '100',
        'start': convertPageToStart()
      };

      return params;
    }


    /**
     * @name getFacetFields
     *
     * @memberof dhsniem.service:solrSearch
     *
     * @description Iterates over the facets object to return an array of the fields to be used as facets.
     *
     * @returns {string[]} An array of the facet fields with exclude tags prepended.
     */
    function getFacetFields() {
      var fields = [];
      var excludeTag;
      for (var facetField in facets) {
        excludeTag = '{!ex=' + facetField + 'tag}';
        fields.push(excludeTag + facetField);
      }
      return fields;
    }


    /**
     * @name groupSelectedFacets
     *
     * @memberof dhsniem.service:solrSearch
     *
     * @description Loops through the selected facets and groups the same facet values under the same facet name. Adds the exclude tag to make the array ready for the solr search param, fq.
     *
     * @returns {string[]} An array of the facets grouped by facet for when multiple facets values (fields) of the same facet are selected. Also includes the exclude tags so filters form a union.
     */
    function groupSelectedFacets() {

      var facetGroups = {};
      var facetKey;
      var facetVal;
      var groupedFacets = [];
      var groupedFacetString;

      getSelectedFacets().forEach(function(selectedFacet) {
        facetKey = selectedFacet.split(':')[0];
        facetVal = selectedFacet.split(':')[1];

        if (facetKey === 'domain' || facetKey === 'externalStandard' || facetKey === 'otherNamespace') {
          if (facetGroups['namespace']) {
            facetGroups['namespace'] = facetGroups['namespace'].concat(' ').concat(facetVal);
          } else {
            facetGroups['namespace'] = facetVal;
          }
        } else {
          if (facetGroups[facetKey]) {
            facetGroups[facetKey] = facetGroups[facetKey].concat(' ').concat(facetVal);
          } else {
            facetGroups[facetKey] = facetVal;
          }
        }

      });

      Object.keys(facetGroups).forEach(function(key) {
        // Combine the exclude tag for all namespace types
        if (key === 'namespace') {
          groupedFacetString = '{!tag=domaintag,otherNamespacetag,externalStandardtag}namespace:(' + facetGroups[key] + ')';
        } else {
          groupedFacetString = '{!tag=' + key + 'tag}' + key + ':(' + facetGroups[key] + ')';
        }
        groupedFacets.push(groupedFacetString);
      });
      return groupedFacets;
    }


    /**
     * @name convertPageToStart
     *
     * @memberof dhsniem.service:solrSearch
     *
     * @description Converts the current page number to a solr start index
     *
     * @returns {number} The start index for solr
     */
    function convertPageToStart() {
      return 100*(getPage() - 1);
    }

  }

})();