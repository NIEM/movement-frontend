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

  function niemChildAccordion($compile) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemChildAccordion/niemChildAccordion.directive.html',
      scope: {
        isInnerChild: '@',
        treeLevel: '@'
      },
      link: function(scope, element) {
        scope.onClick = function() {
          scope.isOpen = !scope.isOpen;
          scope.nextLevel = parseInt(scope.treeLevel, 10) + 1;

          //keep this - will be used for items with children
          /*if (scope.isOpen) {
            element.append('<niem-child-accordion is-inner-child="true" tree-level="{{nextLevel}}"></niem-child-accordion>');
            $compile(element.contents())(scope);
          } else {
            //test
          }*/
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
