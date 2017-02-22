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

  function schemaAddToSchema(NODE_URL, $window, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/schemaAddToSchema/schemaAddToSchema.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within schemaAddToSchema scope
     */
    function link(scope) {

      $rootScope.mySchemaArray = [];

      scope.downloadSchema = function downloadSchema(searchID) {
        $rootScope.mySchemaArray.push(searchID);
        var schemaString = 'itemsToExport[]=' + $rootScope.mySchemaArray.join('&itemsToExport[]=');
        scope.url =  NODE_URL + schemaString;
        $window.open(scope.url, '_parent');
      }
    }
  }
})();
