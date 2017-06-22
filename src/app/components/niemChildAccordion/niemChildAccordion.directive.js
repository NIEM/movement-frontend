'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name niemChildAccordion
 * @param {service} niemTree A service to handle requests for the element tree
 * @description ChildAccordion section for NIEM model
 * @attr {Object} elementData Document data for the accordion root level element
 * @example
 *  Usage:
 *  <niem-child-accordion element-data="item"></niem-child-accordion>
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

        /**
         * @memberof niemChildAccordion
         * @property dataFound
         * @type {boolean}
         * @description Whether or not child data has already been retrieved
         */   
        scope.dataFound = false;

        /**
         * @memberof niemChildAccordion
         * @property isOpen
         * @type {boolean}
         * @description Whether or not the accordion is expanded
         */           
        scope.isOpen = false;
        
        scope.$watch('isOpen', function () {
          scope.accordionState = scope.isOpen ? 'Expanded' : 'Collapsed';
        });


        /**
         * @memberof niemChildAccordion
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
