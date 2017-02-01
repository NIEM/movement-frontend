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
        elementData: '=',
        clickHandler: '='
      },
      link: function(scope, element) {
        scope.dataFound = false;
        scope.isOpen = false;
        scope.seeMore = false;

        /**
         * @name showMore
         *
         * @description Shows the next level of accordion data
         */
        scope.showMore = function() {
          scope.seeMore = !scope.seeMore;
        };

        /**
         * @name onClick
         *
         * @description Handler for selection of accordion item
         */
        scope.onClick = function() {
          scope.isOpen = !scope.isOpen;
          scope.nextLevel = parseInt(scope.treeLevel, 10) + 1;
          if (scope.isOpen && scope.dataFound === false) {
            scope.clickHandler(scope.elementData.type);
            scope.dataFound = true;

          }
        };
      }
    };
  }
})();
