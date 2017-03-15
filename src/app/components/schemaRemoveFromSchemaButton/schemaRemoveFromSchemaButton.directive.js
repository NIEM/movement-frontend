'use strict';

/**
 * @ngdoc directive
 *
 * @name schemaRemoveFromSchemaButton
 *
 * @description
 * My Schema button in the header
 */
(function () {

  angular
    .module('dhsniem')
    .directive('schemaRemoveFromSchemaButton', schemaRemoveFromSchemaButton);

  function schemaRemoveFromSchemaButton(mySchema) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/schemaRemoveFromSchemaButton/schemaRemoveFromSchemaButton.directive.html',
      scope: {
        entityId: '='
      },
      link: link
    };

    /**
     *  Defines variables and functions within schemaRemoveFromSchemaButton scope
     */
    function link(scope) {
      scope.removeFromSchema = function removeFromSchema() {
        mySchema.removeFromSchema(scope.entityId);
      };
    }
  }
})();
