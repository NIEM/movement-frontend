'use strict';

/**
 * @ngdoc directive
 *
 * @name schemaAddToSchema
 *
 * @description
 * My Schema button in the header
 */
(function () {

  angular
    .module('dhsniem')
    .directive('schemaAddToSchema', schemaAddToSchema);

  function schemaAddToSchema(mySchema) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/schemaAddToSchema/schemaAddToSchema.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within schemaAddToSchema scope
     */
    function link(scope) {
      scope.addToSchema = function (searchID) {
        mySchema.addSchema(searchID);
      };


    }
  }
})();