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
        entityType: '=',
        clickHandler: '=',
        selectedEntityName: '='
      },
      link: function(scope, element) {
        scope.dataFound = false;
        scope.isOpen = false;
        scope.seeMore = false;

        /**
         * @name showMore
         *
         * @description
         */
        scope.showMore = function() {
          scope.seeMore = !scope.seeMore;
        };

        /**
         * @name onClick
         *
         * @description
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
