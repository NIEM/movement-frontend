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

  function schemaMySchemaButton($state) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/schemaMySchemaButton/schemaMySchemaButton.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within schemaMySchemaButton scope
     */
    function link(scope) {
      scope.mySchemaPage = function () {
        $state.go('main.mySchema');
      }
    }
  }
})();