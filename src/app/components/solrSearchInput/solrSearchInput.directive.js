'use strict';

/**
 * @ngdoc directive
 *
 * @name solrSearchInput
 *
 * @description
 * Search input for solr
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

      function init () {
        scope.searchQuery = $location.search().q;
        scope.selectedDomain = 'All Domains';
        getDomainNames();
      }

      init();


      /**
       * @name sortByName
       *
       * @description Sorting function used to boost the NIEM Core to the top of the dropdown
       *
       * @returns {(string|number)}
       */
      scope.sortByName = function(result) {
        if (result === 'Core') {
          return -1;
        } else {
          return result;
        }
      };


      /**
       * @name getDomainNames
       *
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
       * @name domainSelect
       *
       * @description Sets the domain name in the domain search dropdown.
       *
       * @param domain - A parameter passed from the view that indicates the intended domain for search.
       */
      scope.domainSelect = function(domain) {
        scope.selectedDomain = domain;
      };


      /**
       * @name search
       *
       * @description Handles logic to determine the query to send to solr to make a full search and navigate the user to the results page.
       *
       * @param taItem - An optional parameter used if the user clicks on an item in the typeahead suggested terms.
       */
      scope.search = function search(taItem) {

        scope.setNamespace(taItem);

        var query = scope.searchQuery || '*';
        $rootScope.query = query;

        if (!$state.includes('main.results')) {
          $state.go('main.results', {q: query, selectedFacets: scope.namespaceParam});
        } else {
          $location.search('q', query);
          solrSearch.clearAllFilters(scope.namespaceParam);
        }
      };


      /**
       * @name setNamespace
       *
       * @description Handles logic to determine the selected facet (namespace) that will be used as a parameter in the search function.
       *
       * @param taItem - An optional parameter passed from the search function and used if the user clicks on an item in the typeahead suggested terms.
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
       * @name getTypeaheadResults
       *
       * @description Returns the top five results, if they exist, for when the typeahead functionality is triggered in the search bar. For each result, the object contains the solr object if it is a natural result from solr. Otherwise, when domain is not specified in the dropdown, returns a custom object that is hard-coded for the first three results displayed in typeahead.
       *
       * @param query - the query of the typeahead search
       *
       * @returns {Object[]}
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
