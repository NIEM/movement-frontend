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

  function schemaRemoveFromSchemaButton($rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/schemaRemoveFromSchemaButton/schemaRemoveFromSchemaButton.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within schemaRemoveFromSchemaButton scope
     */
    function link(scope) {

      $rootScope.mySchemaArray = [];

      scope.removeFromSchema = function removeFromSchema(searchID) {
        var index = $rootScope.mySchemaArray.indexOf(searchID);
        $rootScope.mySchemaArray.splice(index, 1);
      }
    }
  }
})();
