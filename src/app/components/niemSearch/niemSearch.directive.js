'use strict';

/**
 * @ngdoc directive
 *
 * @name NiemSearch
 *
 * @description
 * Search input for NIEM model
 */
(function() {

  angular
    .module('dhsniem')
    .directive('niemSearch', niemSearch);

  function niemSearch($location, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemSearch/niemSearch.directive.html',
      scope: {
        hasLabel: '='
      },
      require: '^solr',
      link: link
    };

    /**
     *  Defines variables and functions within niemSearch scope
     */
    function link(scope, element, attrs, ctrl) {
      scope.states = ['DriverLicenseCardIdentification', 'CreditBankIDCardCategoryCode', 'CardPicture', 'CreditCard'];

      scope.query = $location.search().q;

      scope.search = function search(query) {

        query = query || '*';

        if ($location.path() !== '/results') {
          $state.go('main.results', {q: query});
        }
        
        $location.search('q', query);

        ctrl.search();

      };

      if (attrs.preload) {
        scope.search(attrs.query);
      }
    }

  }

})();
