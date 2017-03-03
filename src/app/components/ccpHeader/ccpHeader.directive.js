'use strict';

/**
 * @ngdoc directive
 *
 * @name ccpHeader
 *
 * @description
 * Main header throughout app
 */
(function () {

  angular
    .module('dhsniem')
    .directive('ccpHeader', ccpHeader);

  function ccpHeader(mySchema) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/ccpHeader/ccpHeader.directive.html',
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
