'use strict';

/**
 * @ngdoc directive
 *
 * @name NiemAccordion
 *
 * @description
 * Accordion section for NIEM model
 */
(function() {

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
        entityType: '='
      },
      link: function(scope, element) {
        scope.$watch('data', function(data) {
          //scope.data = data;
          //console.log(scope.data);
        })
        scope.isOpen = false;
        scope.dataFound = false;

        scope.toggleAccordion = function() {
          scope.isOpen = !scope.isOpen;
          if (scope.isOpen && scope.dataFound === false) {
            scope.dataFound = true;
            if (!!scope.data) {
              if (scope.entityType === 'Element') {
                scope.clickHandler(scope.data);
              } else {
                for (var i = 0; i < scope.data.length; i++) {
                  if (!!scope.data[i].type.elements) {
                    scope.clickHandler(scope.data[i].type);
                  }
                }
              }
            }
          }
        };
      }
    };

  }

  /**
   *  Defines variables and functions within niemAccordion scope
   *
   */
  /*function link(scope, element) {
    scope.isOpen = false;

    scope.toggleAccordion = function() {
      scope.isOpen = !scope.isOpen;

      //if (scope.isOpen) {

      //  console.log(scope.data);
      scope.clickHandler(scope.data);

      //element.append('<div ng-include="app/components/niemAccordion/niemAccordionList.html"></div>');

      element.append('<div ng-include="' + 'app/components/niemAccordion/niemAccordionList.html' + '"></div>');
      $compile(element.contents())(scope);
      console.log(scope.data);
      //}

    };
  }*/

})();
