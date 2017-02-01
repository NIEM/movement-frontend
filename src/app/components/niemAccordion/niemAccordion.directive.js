'use strict';

/**
 * @ngdoc directive
 *
 * @name NiemAccordion
 *
 * @description
 * Accordion section for NIEM model
 */
(function () {

  angular
    .module('dhsniem')
    .directive('niemAccordion', niemAccordion);

  function niemAccordion($compile) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemAccordion/niemAccordion.directive.html',
      scope: {
        data: '=',
        title: '=',
        clickHandler: '=',
        entityType: '=',
        isProperties: '='
      },
      link: function (scope, element) {
        scope.isOpen = false;
        scope.dataFound = false;

        /**
         * @name toggleAccordion
         *
         * @description Opens currently closed accordions and closes currently opened accordions when called
         */
        scope.toggleAccordion = function () {
          scope.isOpen = !scope.isOpen;
          if (scope.isOpen && scope.dataFound === false) {
            scope.dataFound = true;
            if (!!scope.data) {
              if (scope.entityType === 'Element') {
                scope.clickHandler(scope.data);
              } else {
                //for Type Contains
                if (scope.isProperties === true) {
                  //for Type Properties
                  for (var i = 0; i < scope.data.length; i++) {
                    if (!!scope.data[i].type.elements) {
                      scope.clickHandler(scope.data[i].type);
                    }
                  }
                } else {
                  if (!!scope.data.elements) {
                    scope.clickHandler(scope.data);
                  }
                }
              }
            }
          }
        };
      }
    };
  }
})();
