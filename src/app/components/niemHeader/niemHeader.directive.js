'use strict';

/**
 * @ngdoc directive
 *
 * @name niemHeader
 *
 * @description
 * Main header throughout app
 */
(function () {

  angular
    .module('dhsniem')
    .directive('niemHeader', niemHeader);

  function niemHeader(mySchema) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/niemHeader/niemHeader.directive.html',
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
