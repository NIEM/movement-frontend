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
    var facets = {};
    var facetFields = {};
    var selectedFacets = getSelectedFacetsFromLocation();

    return {
      getDocs: getDocs,
      getNumFound: getNumFound,
      getQuery: getQuery,
      getFacets: getFacets,
      getFacetFields: getFacetFields,
      getSelectedFacets: getSelectedFacets,
      setFacet: setFacet,
      setFacetResult: setFacetResult,
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


    function getFacets() {
      return facets;
    }


    function getFacetFields() {
      return facetFields;
    }

    
    function getSelectedFacets() {
      return selectedFacets;
    }


    /*
    * Setters
    */

    /**
     * @name setFacet
     *
     * @memberof dhsniem.service:solrSearch
     *
     * @description Sets the facets object with a key and value of a facet field and its scope from the solrFacet directive, respectively.
     *
     * @param facet
     */
    function setFacet(facet) {
      facets[facet.field] = facet;      
    }


    /**
     * @name setFacetResult
     *
     * @memberof dhsniem.service:solrSearch
     *
     * @description Sets the results (possible filter values) to the respective facet field name on the facets object.
     */
    function setFacetResult(facetKey, facetResults) {
      for (var key in facets) {
        if (facets[key].field === facetKey) {
          facets[key].results = facetResults;
        }
      }      
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
      for (var k in facets) {
        excludeTag = '{!ex=' + facets[k].field + 'tag}';
        fields.push(excludeTag + facets[k].field);
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