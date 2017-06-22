'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name solrSearchInput
 * @param {service} $location The $location service parses the URL in the browser address bar (based on the window.location) and makes the URL available to your application
 * @param {service} $rootScope The root scope of the application
 * @param {service} $state Handles the application's current state via ui-router
 * @param {service} solrRequest A service that handles requests to the Solr API
 * @param {service} solrSearch A service that handles custom querying for the Solr API
 * @description Search input for solr
 * @attr hasLabel Whether or not the search has a label
 * @example
 *  Usage:
 *  <solr-search-input has-label="true"></solr-search-input>
 */
(function() {

  angular
    .module('dhsniem')
    .directive('solrSearchInput', solrSearchInput);

  function solrSearchInput($location, $state, solrSearch, solrRequest, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/solrSearchInput/solrSearchInput.directive.html',
      scope: {
        hasLabel: '='
      },
      link: link
    };

    /**
     *  Defines variables and functions within solrSearchInput scope
     */
    function link(scope) {

      /**
       * @private
       * @description Initializes the view to set scope variables on page load
       */
      function init () {
        /**
         * @memberof solrSearchInput
         * @property searchQuery
         * @type {String}
         * @description The search query
         */
        scope.searchQuery = $location.search().q;

        /**
         * @memberof solrSearchInput
         * @property selectedDomain
         * @type {String}
         * @description The current selected domain
         */
        scope.selectedDomain = 'All Domains';

        getDomainNames();
      }

      init();


      /**
       * @memberof solrSearchInput
       * @param {String} result The value to sort by
       * @returns {(String|Number)} Returns -1 if Core, else the value
       * @description Sorting function used to boost the NIEM Core to the top of the dropdown
       */
      scope.sortByName = function(result) {
        if (result === 'Core') {
          return -1;
        } else {
          return result;
        }
      };


      /**
       * @private
       * @description Gets a list of domain names for the domain dropdown, and stores them for reuse.
       */
      function getDomainNames() {
        if (!$rootScope.domainList) {
          solrRequest.getDomains().then(function(domains) {
            $rootScope.domainList = Object.keys(domains);
            scope.domainNames = $rootScope.domainList;
          });
        } else {
          scope.domainNames = $rootScope.domainList;
        }
      }


      /**
       * @memberof solrSearchInput
       * @param {String} domain A parameter passed from the view that indicates the intended domain for search.
       * @description Sets the domain name in the domain search dropdown.
       */
      scope.domainSelect = function(domain) {
        scope.selectedDomain = domain;
      };


      /**
       * @memberof solrSearchInput
       * @param {String} taItem An optional parameter used if the user clicks on an item in the typeahead suggested terms.
       * @description Handles logic to determine the query to send to solr to make a full search and navigate the user to the results page.
       */
      scope.search = function search(taItem) {

        scope.setNamespace(taItem);
        var query = scope.searchQuery || '*';

        if (!$state.includes('main.results')) {
          $state.go('main.results', {q: query, selectedFacets: scope.namespaceParam});
        } else {
          $location.search('q', query);
          solrSearch.clearAllFilters(scope.namespaceParam);
        }
      };


      /**
       * @memberof solrSearchInput
       * @param {String} taItem An optional parameter passed from the search function and used if the user clicks on an item in the typeahead suggested terms.
       * @description Handles logic to determine the selected facet (namespace) that will be used as a parameter in the search function.
       */
      scope.setNamespace = function setNamespace(taItem) {

        if (taItem && taItem.taNS) {
          scope.searchQuery = taItem.query;
          if (taItem.taNS !== 'all') {
            scope.namespaceParam = taItem.taNSType + ':"' + taItem.taNS + '"';
          }
        } else if (scope.selectedDomain !== 'All Domains') {
          var taNSparams = {'taNSType': 'domain', 'taNS': scope.selectedDomain};
          scope.namespaceParam = taNSparams.taNSType + ':"' + taNSparams.taNS + '"';
        }
      };


      /**
       * @memberof solrSearchInput
       * @param {String} query The query of the typeahead search
       * @returns {Object[]} An array of the matched element documents
       * @description Returns the top five results, if they exist, for when the typeahead functionality is triggered in the search bar. For each result, the object contains the solr object if it is a natural result from solr. Otherwise, when domain is not specified in the dropdown, returns a custom object that is hard-coded for the first three results displayed in typeahead.
       */
      scope.getTypeaheadResults = function(query) {

        var facet = ['isBG:(1)'];
        if (scope.selectedDomain !== 'All Domains') {
          facet.push('namespace:("' + scope.selectedDomain + '")');
        }

        var params = {
          'q': query,
          'rows': 5,
          'json.wrf': 'JSON_CALLBACK',
          'json.nl': 'map',
          'facet': 'on',
          'fq': facet,
          'sort': 'score desc,nameLength asc,name asc',
          'defType': 'edismax',
          'bq': 'namespace:Core^2',
          'qf': 'name^2 name_query^8'
        };

        return solrRequest.makeSolrRequest(params).then(function(data) {
          if (data.response.docs.length > 0) {
            var topNamespace = data.response.docs[0].namespace;
            var topNamespaceType = data.response.docs[0].namespaceType;
            var domainArray;
            if (scope.selectedDomain === 'All Domains') {
              domainArray = [{'name': query + ' in All Domains', 'taNS': 'all', 'query': query}, {'name': query + ' in NIEM Core', 'taNS': 'Core', 'query': query, 'taNSType': 'domain'}];
              domainArray.push({'name': query + ' in ' + topNamespace, 'taNS': topNamespace, 'query': query, 'taNSType': topNamespaceType});
              scope.domainSpecified = 'third-child';
            } else {
              domainArray = [{'name': query + ' in ' + scope.selectedDomain, 'taNS': scope.selectedDomain, 'query': query, 'taNSType': 'domain'}];
              scope.domainSpecified = 'first-child';
            }
            return domainArray.concat(data.response.docs);
          }
        });
      };
    }
  }
})();
