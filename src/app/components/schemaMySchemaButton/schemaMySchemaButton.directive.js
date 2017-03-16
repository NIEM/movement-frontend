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

  function schemaMySchemaButton(mySchema) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/schemaMySchemaButton/schemaMySchemaButton.directive.html',
      link: link
    };


    /**
     *  Defines variables and functions within header scope
     *
     */
    function link(scope) {
      scope.schemaCount = mySchema.getSchemaCount();

      scope.$watch(function() {
        return mySchema.getSchemaCount();
      }, function(updatedSchemaCount){
        scope.schemaCount = updatedSchemaCount;
      });

    }
  }
})();
