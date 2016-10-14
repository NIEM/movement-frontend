'use strict';

/**
 * @ngdoc directive
 *
 * @name solrSearch
 *
 * @description
 * Search input for solr
 */
(function() {

  angular
    .module('dhsniem')
    .directive('solrSearch', solrSearch);

  function solrSearch($location, $state, solrSearch, solrRequest, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/solrSearch/solrSearch.directive.html',
      scope: {
        hasLabel: '='
      },
      link: link
    };

    /**
     *  Defines variables and functions within solrSearch scope
     */
    function link(scope, element, attrs) {

      scope.searchQuery = $location.search().q;

      scope.search = function search(taItem) {

        var namespaceParam = '';

        if (taItem && taItem.taNS) {
          scope.searchQuery = taItem.query;
          if (taItem.taNS !== 'all') {
            namespaceParam = taItem.taNSType + ':"' + taItem.taNS + '"';
          }
        }

        var query = scope.searchQuery || '*';
        $rootScope.query = query;

        if (!$state.includes('main.results')) {
          $state.go('main.results', {q: query, selectedFacets: namespaceParam});
        } else {
          $location.search('q', query);
          solrSearch.clearAllFilters(namespaceParam);
        }

      };

      scope.getTypeaheadResults = function(query) {

        var params = {
          'q': 'name:*' + query + '*',
          'rows': 5,
          'wt': 'json',
          'json.wrf': 'JSON_CALLBACK',
          'json.nl': 'map'
        };

        var domainArray = [{'name': query + ' in All Domains', 'taNS': 'all', 'query': query}, {'name': query + ' in NIEM Core', 'taNS': 'NIEM Core', 'query': query, 'taNSType': 'domain'}];

        return solrRequest.makeSolrRequest(params).then(function(data) {
          if (data.response.docs.length > 0) {
            var topNamespace = data.response.docs[0].namespace;
            var topNamespaceType = data.response.docs[0].namespaceType;
            domainArray.push({'name': query + ' in ' + topNamespace, 'taNS': topNamespace, 'query': query, 'taNSType': topNamespaceType});
            return domainArray.concat(data.response.docs);
          }
        });

      };

    }

  }

})();
