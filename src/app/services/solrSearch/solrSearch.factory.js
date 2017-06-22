'use strict';

/**
 * @ngdoc factory
 * @memberof dhsniem
 * @name solrSearch
 * @param {service} $location The $location service parses the URL in the browser address bar (based on the window.location) and makes the URL available to your application
 * @param {service} $rootScope The root scope of the application
 * @param {service} $window A reference to the browser's window object
 * @param {service} $q A service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing
 * @param {service} solrRequest A service that handles requests to the Solr API
 * @description Factory for Solr Search
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
      'externalStandard': {}
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


    /**
     * @memberof solrSearch
     * @description Gets the array of documents from solr search
     */
    function getDocs() {
      return docs;
    }

    /**
     * @memberof solrSearch
     * @description Gets the number of documents from solr search
     */
    function getNumFound() {
      return numFound;
    }

    /**
     * @memberof solrSearch
     * @description Gets the current query
     */
    function getQuery() {
      return $location.search().q || '*';
    }


    /**
     * @memberof solrSearch
     * @description Gets the current sort
     */
    function getSort() {
      return $location.search().sortBy || 'score desc';
    }

    /**
     * @memberof solrSearch
     * @description Gets the current page of results
     */
    function getPage() {
      return $location.search().page || '1';
    }

    /**
     * @memberof solrSearch
     * @param {String} facetField Facet field to retrieve facet values for
     * @description Gets a list of facet values for a facet
     */
    function getFacet(facetField) {
      return facets[facetField];
    }

    /**
     * @memberof solrSearch
     * @description Gets the current selected facets
     */
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
     * @memberof solrSearch
     * @description Performs the solr search via call to the http method. On success, sets response data to the service variables.
     */
    function search() {
      solrRequest.makeSolrRequest(buildSearchParams()).then(function(data) {
        docs = data.response.docs;
        numFound = data.response.numFound;
        facets = data.facet_counts.facet_fields;
        $rootScope.$emit('newSearch');
      });
      $rootScope.lastSearch = $location.search();
      $window.document.title = '\'' + getQuery() + '\'' + ' search results - NIEM Movement';
    }


    /**
     * @memberof solrSearch
     * @param {String} exception A filter to keep for use with typeahead
     * @description Clears any selected facets (filters) and calls a new search.
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
     * @private
     * @returns {Object} The params object
     * @description Dynamically builds the search params for a jsonp $http request to the solr instance.
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
     * @private
     * @returns {String[]} An array of the facet fields with exclude tags prepended.
     * @description Iterates over the facets object to return an array of the fields to be used as facets.
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
     * @private
     * @returns {String[]} A array of strings of the facets grouped by facet for when multiple facets values (fields) of the same facet are selected. Also includes the exclude tags so filters form a union.
     * @description Loops through the selected facets and groups the same facet values under the same facet name. Adds the exclude tag to make the array ready for the solr search param, fq. Modified from Release 1 to now only account for once facet group: namespace. Static fq applied to only include business glossary (bg) terms.
     */
    function groupSelectedFacets() {

      var groupedFacets = ['isBG:(1)']; // Hard-coded to always only include BG terms. While we could put this as part of the query param, it is more efficient to use in fq.
      var selectedFacets = getSelectedFacets();

      if (selectedFacets.length > 0) {
        var selectedFacetValues = selectedFacets.map(function(selectedFacet) {
          return selectedFacet.split(':')[1];
        }).join(' ');

        groupedFacets.push('{!tag=domaintag,externalStandardtag}namespace:(' + selectedFacetValues + ')');
      }

      return groupedFacets;
    }


    /**
     * @private
     * @returns {Number} The start index for solr
     * @description Converts the current page number to a solr start index
     */
    function convertPageToStart() {
      return 100*(getPage() - 1);
    }

  }

})();
