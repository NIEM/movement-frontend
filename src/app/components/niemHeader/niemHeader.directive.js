'use strict';

/**
 * @ngdoc directive
 *
 * @name niemHeader
 *
 * @description
 * Main header throughout app
 */
(function () {

  angular
    .module('dhsniem')
    .directive('niemHeader', niemHeader);

  function niemHeader(mySchema, $rootScope, $location, $anchorScroll, $window) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemHeader/niemHeader.directive.html',
      link: link
    };


    /**
     *  Defines variables and functions within header scope
     *
     */
    function link(scope) {
      scope.schemaCount = mySchema.getSchemaCount();

      scope.$watch(function () {
        return mySchema.getSchemaCount();
      }, function (updatedSchemaCount) {
        scope.schemaCount = updatedSchemaCount;
      });

      $rootScope.goToAnchor = function goToAnchor(anchor) {
        $location.hash(anchor);
        $anchorScroll();
        var el = $window.document.getElementById(anchor);
        if (el) {
          el.focus();
        }
      };


    }

  }
})();
