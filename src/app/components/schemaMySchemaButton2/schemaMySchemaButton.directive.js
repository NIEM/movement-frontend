'use strict';

/**
 * @ngdoc directive
 *
 * @name schemaMySchemaButton
 *
 * @description
 * My Schema button in the header
 */
(function() {

  angular
    .module('dhsniem')
    .directive('schemaMySchemaButton', schemaMySchemaButton);

  function schemaMySchemaButton($location) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/schemaMySchemaButton/schemaMySchemaButton.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within schemaMySchemaButton scope
     */
    function link(scope) {
      console.log($location.$$path);
        if ($location.$$path == '/results') {
          console.log('true');
          scope.resultsPage = true;
      }
    }
  }
})();
