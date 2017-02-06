'use strict';

/**
 * @ngdoc directive
 *
 * @name schemaDownload
 *
 * @description
 * My Schema button in the header
 */
(function() {

  angular
    .module('dhsniem')
    .directive('schemaDownload', schemaDownload);

  function schemaDownload() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/schemaDownload/schemaDownload.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within schemaDownload scope
     */
    function link(scope) {
    //
    //   scope.downloadSchema = function downloadSchema() {
    //     console.log('hello!');
    //
    //     scope.exportLink = '';
    //
    //
    //
    //     nodeRequest.makeNodeRequest(itemsToExport).then(function(data){
    //       var response = data;
    //
    //
    //     });
    //
    //   }
    //
    }
  }
})();
