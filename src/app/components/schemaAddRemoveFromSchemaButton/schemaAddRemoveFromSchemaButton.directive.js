'use strict';

/**
 * @ngdoc directive
 *
 * @name schemaAddRemoveFromSchemaButton
 *
 * @description
 * directive for dhsniem
 */
(function () {

  angular
    .module('dhsniem')
    .directive('schemaAddRemoveFromSchemaButton', schemaAddRemoveFromSchemaButton);

  function schemaAddRemoveFromSchemaButton(mySchema) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/schemaAddRemoveFromSchemaButton/schemaAddRemoveFromSchemaButton.directive.html',
      scope: {
        entityId: '='
      },
      link: link
    };

    /**
     *  Defines variables and functions within schemaAddRemoveFromSchemaButton scope
     */
    function link(scope) {

      scope.isInMySchema = mySchema.getSchema().indexOf(scope.entityId) > -1;
      toggleSchemaButtonText();


      /**
       * @name toggleSchemaAddRemove
       *
       * @description Toggles the isInMySchema scope variable to show/hide the add/remove buttons
       */
      scope.toggleSchemaAddRemove = function () {
        scope.isInMySchema = !scope.isInMySchema;
        toggleSchemaButtonText();
        if (scope.isInMySchema) {
          mySchema.addToSchema(scope.entityId);
        } else {
          mySchema.removeFromSchema(scope.entityId);
        }
      };


      /**
       * @name toggleSchemaButtonText
       *
       * @description Toggles button text based on if an item exists in my schema
       */
      function toggleSchemaButtonText() {
        scope.schemaAddRemoveButton = scope.isInMySchema ? 'Remove from Subset' : 'Add to Subset';
      }

    }
  }

})();


