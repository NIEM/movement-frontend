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
    function link(scope, element, attrs, ctrl) {

      scope.searchQuery = $location.search().q;

      scope.search = function search() {

        var query = scope.searchQuery || '*';

        if ($location.path() !== '/results') {
          $state.go('main.results', {q: query});
        }

        $location.search('q', query);
        solrSearch.clearAllFilters();

      };

      scope.getTypeaheadResults = function(query) {

        var params = {
          'q': 'name:*' + query + '*',
          'rows': 5,
          'wt': 'json',
          'json.wrf': 'JSON_CALLBACK',
          'json.nl': 'map'
        };

        var domainArray = [{'name': query + ' in All Domains'}, {'name': query + ' in NIEM Core'}];

        return solrRequest.makeSolrRequest(params).then(function(data) {
          if (data.response.docs) {
            scope.topNamespace = data.response.docs[0].namespace;
            domainArray.push({'name': query + ' in ' + scope.topNamespace});
            return domainArray.concat(data.response.docs);
          }
        });

      };

    }

  }

})();
