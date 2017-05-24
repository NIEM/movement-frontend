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

  function niemChildAccordion(niemTree) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemChildAccordion/niemChildAccordion.directive.html',
      scope: {
        elementData: '='
      },
      link: function(scope) {
        scope.dataFound = false;
        scope.isOpen = false;
        scope.$watch('isOpen', function () {
          scope.accordionState = scope.isOpen ? 'Expanded' : 'Collapsed';
        });


        /**
         * @name expandElement
         *
         * @description Expands the accordion for the clicked element and fetches the data if not previously loaded
         */
        scope.expandElement = function() {
          scope.isOpen = !scope.isOpen;

          if (scope.isOpen && scope.dataFound === false) {
            // Only fetch the full children docs, if they children are children of the type. Otherwise, if they are from a substitution group, don't fetch.
            if(scope.elementData.type) {
              niemTree.getElementObjects(scope.elementData.type.elements).then(function (elements) {
                scope.elementData.type.elements = elements;
              });
            }
            scope.dataFound = true;
          }
        };
      }
    };
  }
})();
