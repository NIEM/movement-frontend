'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name subsetMySubsetDetails
 * @param {service} $window A reference to the browser's window object
 * @param {service} mySubset Handles getting and setting value in the subset generator
 * @param {service} niemTree A service to handle requests for the element tree
 * @param {constant} NODE_URL The URL endpoint for the JSON schema API transformation
 * @description My Subset details
 * @example
 *  Usage:
 *  <subset-my-subset-details></subset-my-subset-details>
 */
(function () {

  angular
    .module('dhsniem')
    .directive('subsetMySubsetDetails', subsetMySubsetDetails);

  function subsetMySubsetDetails($window, mySubset, NODE_URL, niemTree) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/subsetMySubsetDetails/subsetMySubsetDetails.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within solr scope
     */
    function link(scope) {
      scope.$on('updatedMySubsetArray', function (event, args) {
        scope.mySubsetIDs = args;
        getSubsetArray();
      });

      /**
       * @private
       * @description Retrieves My Subset
       */
      function init() {
        $window.document.title = 'My Subset Builder - NIEM Movement';
        getSubset();
      }

      init();


      /**
       * @memberof subsetMySubsetDetails
       * @param {String} namespaceType String representing the type of Namespace
       * @returns {String} Teh display value for the namespace type
       * @description Transforms the namespaceType returned into properly formatted text
       */
      scope.formatNamespaceType = function formatNamespaceType(namespaceType) {
        return {
          'domain': 'Domain',
          'externalStandard': 'External Standard'
        }[namespaceType];
      };


      /**
       * @private
       * @description Sets scope variable to the element IDs in My subset
       */
      function getSubset() {
        scope.mySubsetIDs = mySubset.getSubset();
        if (scope.mySubsetIDs.length) {
          getSubsetArray();
        }
      }


      /**
       * @private
       * @description Sets the My subset array of IDs to an array of full documents for those elements
       */
      function getSubsetArray() {
        niemTree.getElementObjects(scope.mySubsetIDs).then(function(elementDocs) {
          scope.mySubsetArray = elementDocs;
        });
      }


      /**
       * @memberof subsetMySubsetDetails
       * @description Downloads all items in my schema to JSON file
       */
      scope.downloadSchema = function downloadSchema() {
        $window.ga('send', 'event', 'button', 'click', 'download-schema');
        scope.url = NODE_URL + 'itemsToExport[]=' + scope.mySubsetIDs.join('&itemsToExport[]=');
        $window.open(scope.url, '_parent');
      };


      /**
       * @memberof subsetMySubsetDetails
       * @description Removes all items in my subset
       */
      scope.removeSubset = function removeSubset() {
        mySubset.removeAllFromSubset();
        scope.mySubsetArray = [];
      };
    }
  }
})();
