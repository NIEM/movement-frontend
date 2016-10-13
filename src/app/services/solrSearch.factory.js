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

  function solrSearch($location, $rootScope, solrRequest) {

    var docs;
    var numFound;
    var selectedFacets = getSelectedFacetsFromLocation();

    var facetFields = {
      'entityType': {},
      'domain': {},
      'externalStandard': {},
      'otherNamespace': {}
    };

    return {
      getDocs: getDocs,
      getNumFound: getNumFound,
      getQuery: getQuery,
      getSort: getSort,
      getFacetFields: getFacetFields,
      getSelectedFacets: getSelectedFacets,
      search: search,
      clearAllFilters: clearAllFilters
    };


    /* 
    * Getters
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

    function getFacetFields() {
      return facetFields;
    }
    
    function getSelectedFacets() {
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

        facetFields = data.facet_counts.facet_fields;
        selectedFacets = getSelectedFacetsFromLocation();

        $rootScope.$emit('newSearch');

      });
    }


    function clearAllFilters() {
      selectedFacets = [];
      $location.search('selectedFacets', selectedFacets);
      search();
    }

 
    /**
     * @name buildSearchParams
     *
     * @memberof dhsniem.service:solrSearch
     *
     * @description Dynamically builds the search params for a jsonp $http request to the solr instance.
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
        'facet.field': listFields()
      };

      if (selectedFacets) {
        params['fq'] = groupSelectedFacets();
      }

      return params;
    }


    /**
     * @name listFields
     *
     * @memberof dhsniem.service:solrSearch
     *
     * @description Iterates over the facets object to return an array of the fields to be used as facets.
     *
     * @returns fields - an array of the facet fields
     */

    function listFields() {
      var fields = [];
      var excludeTag;
      for (var k in facetFields) {
        excludeTag = '{!ex=' + k + 'tag}';
        fields.push(excludeTag + k);
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
     * @returns groupedFacets - an array of the facet values grouped by facet name in query with exclude format, e.g. ['{!tag=domaintag}domain:Biometrics Justice Intelligence']
     */
    function groupSelectedFacets() {

      var facetGroups = {};
      var facetKey;
      var facetVal;
      var groupedFacets = [];
      var groupedFacetString;

      selectedFacets.forEach(function(selectedFacet) {
        facetKey = selectedFacet.split(':')[0];
        facetVal = selectedFacet.split(':')[1];

        if (facetGroups[facetKey]) {
          facetGroups[facetKey] = facetGroups[facetKey].concat(' ').concat(facetVal);
        } else {
          facetGroups[facetKey] = facetVal;
        }
      });

      Object.keys(facetGroups).forEach(function(key) {
        groupedFacetString = '{!tag=' + key + 'tag}' + key + ':' + facetGroups[key];
        groupedFacets.push(groupedFacetString);
      });

      return groupedFacets;
    }


    function getSelectedFacetsFromLocation() {
      var selected = $location.search().selectedFacets;
      var selectedFacets = [];

      if (angular.isArray(selected)) {
        selectedFacets = selected;
      } else if (selected) {
        selectedFacets.push(selected);
      }
      return selectedFacets;
    }

  }

})();