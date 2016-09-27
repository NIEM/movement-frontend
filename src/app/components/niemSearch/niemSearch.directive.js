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
      scope: {},
      link: link
    };

  }

  /**
   *  Defines variables and functions within niemSearch scope
   *
   */
  function link(scope) {

    console.log('this is link');
  }

})();
