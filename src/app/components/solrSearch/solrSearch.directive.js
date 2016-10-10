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

  function solrSearch($location, $state, solrSearch) {
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

      scope.states = ['DriverLicenseCardIdentification', 'CreditBankIDCardCategoryCode', 'CardPicture', 'CreditCard'];

      scope.searchQuery = $location.search().q;

      scope.search = function search() {

        var query = scope.searchQuery || '*';

        if ($location.path() !== '/results') {
          $state.go('main.results', {q: query});
        }
        
        $location.search('q', query);
        solrSearch.clearAllFilters();

      };

    }

  }

})();
