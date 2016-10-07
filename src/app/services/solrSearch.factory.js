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

  function solrSearch($q, $http, $location, $rootScope) {

    var docs;
    var numFound;
    var facets = {};
    var facetFields = {};
    var selectedFacets = getSelectedFacets();
    var solrUrl = 'http://localhost:8983/solr/niem-test-xsd/select';

    return {
      search: search,
      getQuery: getQuery,
      buildSearchParams: buildSearchParams,
      registerFacet: registerFacet,
      getFacets: getFacets,
      setFacetResult: setFacetResult,
      getDocs: getDocs,
      getNumFound: getNumFound,
      getFacetFields: getFacetFields,
      returnSelectedFacets: returnSelectedFacets
    };

    function returnSelectedFacets() {
      return selectedFacets;
    }

    function getDocs() {
      return docs;
    }

    function getFacetFields() {
      return facetFields;
    }

    function getNumFound() {
      return numFound;
    }


    function request(url, params) {

      var deferred = $q.defer();

      $http.jsonp(url, {params: params}).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(error) {
        console.log('Error: ', error);
      });

      return deferred.promise;

    }


    function getQuery() {
      return $location.search().q || '*';
    }
    

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
        console.log(groupSelectedFacets());
      }

      return params;
    }


    function registerFacet(facet) {
      facets[facet.field] = facet;      
    }


    function getFacets() {
      return facets;
    }


    function setFacetResult(facetKey, facetResults) {
      for (var key in facets) {
        if (facets[key].field === facetKey) {
          facets[key].results = facetResults;
        }
      }      
    }


    function listFields() {
      var fields = [];
      var excludeTag;
      for (var k in facets) {
        excludeTag = '{!ex=' + facets[k].field + 'tag}';
        fields.push(excludeTag + facets[k].field);
      }
      return fields;
    }


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


    function search() {
      request(solrUrl, buildSearchParams()).then(function(data) {
        
        docs = data.response.docs;
        numFound = data.response.numFound;

        facetFields = data.facet_counts.facet_fields;
        selectedFacets = getSelectedFacets();

        $rootScope.$emit('newSearch')

      });
    }

  }

})();

