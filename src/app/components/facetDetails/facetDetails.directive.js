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
      scope: {
        data: '='
      },
      link: link
    };

  }

  /**
   *  Defines variables and functions within facetDetails scope
   *
   */
  function link(scope) {

    scope.showData = function(pageInfo) {
      scope.minIdx = (pageInfo.currentPageNum - 1) * pageInfo.numPerPage;
      scope.maxIdx = (pageInfo.currentPageNum * pageInfo.numPerPage) - 1;
    };

  }

})();
