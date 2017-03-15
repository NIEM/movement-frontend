'use strict';

/**
 * @ngdoc directive
 *
 * @name schemaAddToSchemaButton
 *
 * @description
 * My Schema button in the header
 */
(function () {

  angular
    .module('dhsniem')
    .directive('schemaAddToSchemaButton', schemaAddToSchemaButton);

  function schemaAddToSchemaButton(mySchema) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/schemaAddToSchemaButton/schemaAddToSchemaButton.directive.html',
      scope: {
        entityId: '='
      },
      link: link
    };

    /**
     *  Defines variables and functions within schemaAddToSchemaButton scope
     */
    function link(scope) {
      scope.addToSchema = function() {
        mySchema.addToSchema(scope.entityId);
      };
    }
  }
})();
