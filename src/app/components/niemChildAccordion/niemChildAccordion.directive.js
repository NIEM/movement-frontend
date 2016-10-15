'use strict';

/**
 * @ngdoc directive
 *
 * @name NiemChildAccordion
 *
 * @description
 * ChildAccordion section for NIEM model
 */
(function() {

  angular
    .module('dhsniem')
    .directive('niemChildAccordion', niemChildAccordion);

  function niemChildAccordion($compile, solrRequest) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemChildAccordion/niemChildAccordion.directive.html',
      scope: {
        treeLevel: '=',
        data: '=',
        elementData: '=',
        getContainingTypes: '=',
        clickHandler: '='
      },
      link: function(scope, element) {
        scope.dataFound = false;

        scope.onClick = function() {
          scope.isOpen = !scope.isOpen;
          scope.nextLevel = parseInt(scope.treeLevel, 10) + 1;
          if (scope.isOpen && scope.dataFound === false) {
            scope.clickHandler(scope.elementData.type);
            console.log(scope.elementData);
            scope.dataFound = true;

          }
        };
      }
    };
  }

  /**
   *  Defines variables and functions within niemChildAccordion scope
   *
   */
  /*function link(scope, element) {
    scope.onClick = function() {
      element.append("<niem-child-accordion></niem-child-accordion>");
      $compile(element.contents())(scope);
    };
  }*/

})();
