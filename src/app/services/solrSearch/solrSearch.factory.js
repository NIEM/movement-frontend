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

  function solrSearch($location, $rootScope, solrRequest, $window, $q) {

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
      // getFacetName: getFacetName,
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
      return $location.search().sortBy || 'score desc';
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
      $window.document.title = '\'' + getQuery() + '\'' + ' seach results - Open Source Tool';
    }


    /**
     * @name getFacetName
     *
     * @memberof dhsniem.service:solrSearch
     *
     * @description Performs the solr search for facets via call to the http method. On success, sets response data to the service variables.
     */
    // function getFacetName() {
    //   var defer = $q.defer();

    //   solrRequest.makeFacetSolrRequest(buildSearchParams()).then(function(data) {
    //     defer.resolve(data);
    //   }).catch(function(error) {
    //     console.log('Error: ', error);
    //   });
    //   return defer.promise;
    // }


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
        'sort': getSort() + ',score desc,nameLength asc,name asc',
        'facet': 'on',
        'facet.mincount': '1',
        'json.wrf': 'JSON_CALLBACK',
        'json.nl': 'map',
        'facet.field': getFacetFields(),
        'fq': groupSelectedFacets(),
        'start': convertPageToStart(),
        'defType': 'edismax',
        'bq': 'namespace:Core^2',
        'qf': 'name^2 name_query^8 definition_query^3 type_query'
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
     * @description Loops through the selected facets and groups the same facet values under the same facet name. Adds the exclude tag to make the array ready for the solr search param, fq. Modified from Release 1 to now only account for once facet group: namespace. Static fq applied to only include business glossary (bg) terms.
     *
     * @returns {string[]} A array of strings of the facets grouped by facet for when multiple facets values (fields) of the same facet are selected. Also includes the exclude tags so filters form a union.
     */
    function groupSelectedFacets() {

      var groupedFacets = ['isBG:(1)']; // Hard-coded to always only include BG terms. While we could put this as part of the query param, it is more efficient to use in fq.
      var selectedFacets = getSelectedFacets();

      if (selectedFacets.length > 0) {
        var selectedFacetValues = selectedFacets.map(function(selectedFacet) {
          return selectedFacet.split(':')[1];
        }).join(' ');

        groupedFacets.push('{!tag=domaintag,otherNamespacetag,externalStandardtag}namespace:(' + selectedFacetValues + ')');
      }

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
