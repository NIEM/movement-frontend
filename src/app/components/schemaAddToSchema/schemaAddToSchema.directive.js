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

  function schemaAddToSchema(NODE_URL, $window) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/schemaAddToSchema/schemaAddToSchema.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within schemaAddToSchema scope
     */
    function link(scope) {

      scope.downloadSchema = function downloadSchema(doc) {
        scope.url =  NODE_URL + 'itemsToExport[]=' + doc.id;
        $window.open(scope.url, '_blank');
      }
    }
  }
})();
