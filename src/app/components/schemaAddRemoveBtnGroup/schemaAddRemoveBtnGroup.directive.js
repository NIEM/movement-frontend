'use strict';

/**
 * @ngdoc directive
 *
 * @name schemaAddRemoveBtnGroup
 *
 * @description
 * directive for dhsniem
 */
(function () {

  angular
    .module('dhsniem')
    .directive('schemaAddRemoveBtnGroup', schemaAddRemoveBtnGroup);

  function schemaAddRemoveBtnGroup(mySchema) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/schemaAddRemoveBtnGroup/schemaAddRemoveBtnGroup.directive.html',
      scope: {
        entityId: '='
      },
      link: link
    };

    /**
     *  Defines variables and functions within schemaAddRemoveBtnGroup scope
     */
    function link(scope) {

      scope.isInMySchema = mySchema.getSchema().indexOf(scope.entityId) > -1;

      /**
       * @name toggleSchemaAddRemove
       *
       * @description Toggles the isInMySchema scope variable to show/hide the add/remove buttons
       */
      scope.toggleSchemaAddRemove = function() {
        scope.isInMySchema = !scope.isInMySchema;
      };
    }
  }

})();


