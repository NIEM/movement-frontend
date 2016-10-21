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
        data: '=',
      },
      link: link
    };

  }

  /**
   *  Defines variables and functions within facetDetails scope
   *
   */
  function link(scope) {
    scope.currentPage = 1;
    scope.showData = function(pageInfo) {
      scope.minIdx = (pageInfo.currentPageNum - 1) * pageInfo.numPerPage;
      scope.maxIdx = (pageInfo.currentPageNum * pageInfo.numPerPage) - 1;
    };

    scope.popoverIsOpen = false;
    scope.popoverTemplateUrl = 'app/components/facetDetails/facetNamePopoverTemplate.html';

    /**
     * @name closePopover
     *
     * @description Closes the tooltip popover on 'Facet Name'
     */
    scope.closePopover = function() {
      scope.popoverIsOpen = false;
    }
  }

})();
