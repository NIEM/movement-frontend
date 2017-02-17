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

  function niemChildAccordion() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemChildAccordion/niemChildAccordion.directive.html',
      scope: {
        elementData: '=',
        clickHandler: '='
      },
      link: function(scope) {
        scope.dataFound = false;
        scope.isOpen = false;

        
        /**
         * @name onClick
         *
         * @description Handler for selection of accordion item
         */
        scope.onClick = function() {
          scope.isOpen = !scope.isOpen;

          if (scope.isOpen && scope.dataFound === false) {
            scope.clickHandler(scope.elementData.type);
            scope.dataFound = true;
          }
        };
      }
    };
  }
})();
