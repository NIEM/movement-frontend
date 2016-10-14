'use strict';

/**
 * @ngdoc directive
 *
 * @name facetDetails
 *
 * @description
 * Sort bar on results page
 */
(function() {

  angular
    .module('dhsniem')
    .directive('facetDetails', facetDetails);

  function facetDetails() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/facetDetails/facetDetails.directive.html',
      link: link
    };

  }

  /**
   *  Defines variables and functions within facetDetails scope
   *
   */
  function link(scope) {}

})();
