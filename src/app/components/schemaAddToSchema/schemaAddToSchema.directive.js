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

  function schemaAddToSchema() {
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

        console.log(doc);

        var itemsToExport = 'itemsToExport[]=biom:BiometricClassification&itemsToExport[]=biom:DNASample';


        var test_node_url = 'http://35.164.75.93:7000/api/jsonschema?';
        var domain = doc.domain;
        var name =  doc.name;
        var param = domain + ':' + name;
        var url =  test_node_url + param;
        

      }
    }
  }
})();
