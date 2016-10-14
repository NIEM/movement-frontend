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

  function solrSearch($location, $state, solrSearch, solrRequest) {
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

        var domainParam = '';

        if (taItem && taItem.taDomain) {
          scope.searchQuery = taItem.query;
          if (taItem.taDomain !== 'all') {
            domainParam = 'domain:"' + taItem.taDomain + '"';
          }
        }

        var query = scope.searchQuery || '*';

        if (!$state.includes('main.results')) {
          $state.go('main.results', {q: query, selectedFacets: domainParam});
        } else {
          $location.search('q', query);
          solrSearch.clearAllFilters(domainParam);
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

        var domainArray = [{'name': query + ' in All Domains', 'taDomain': 'all', 'query': query}, {'name': query + ' in NIEM Core', 'taDomain': 'NIEM Core', 'query': query}];

        return solrRequest.makeSolrRequest(params).then(function(data) {
          if (data.response.docs.length > 0) {
            var topNamespace = data.response.docs[0].namespace;
            var topNamespaceType = data.response.docs[0].namespaceType;
            domainArray.push({'name': query + ' in ' + topNamespace, 'taDomain': topNamespace, 'query': query});
            return domainArray.concat(data.response.docs);
          }
        });

      };

    }

  }

})();
