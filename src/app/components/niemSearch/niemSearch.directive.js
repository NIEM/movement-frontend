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

  function niemSearch() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemSearch/niemSearch.directive.html',
      scope: {
        hasLabel: '='
      },
      controller: SolrSearchCtrl,
      controllerAs: 'SolrSearchCtrl',
      link: link
    };

    /**
     *  Defines variables and functions within niemSearch scope
     */
    function link(scope, element, attrs, ctrl) { }

  }

  function SolrSearchCtrl($location, $state, solrSearch) {
    var vm = this;

    vm.states = ['DriverLicenseCardIdentification', 'CreditBankIDCardCategoryCode', 'CardPicture', 'CreditCard'];

    vm.query = $location.search().q;

    vm.search = function search() {

      var query = vm.query || '*';

      if ($location.path() !== '/results') {
        $state.go('main.results', {q: query});
      }
      
      $location.search('q', query);

      solrSearch.search();

      };

  }

})();
