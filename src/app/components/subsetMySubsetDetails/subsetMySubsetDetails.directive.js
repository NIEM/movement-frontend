'use strict';

/**
 * @ngdoc directive
 *
 * @name subsetMySubsetDetails
 *
 * @description
 * My Subset details
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
       * @name init
       *
       * @description Retrieves My Subset
       */
      function init() {
        $window.document.title = 'My Subset Builder - NIEM Movement';
        getSubset();
      }

      init();


      /**
       * @name formatNamespaceType
       *
       * @description Transforms the namespaceType returned into properly formatted text
       *
       * @param namespaceType - String representing the type of Namespace
       *
       * @returns {string}
       */
      scope.formatNamespaceType = function formatNamespaceType(namespaceType) {
        return {
          'domain': 'Domain',
          'otherNamespace': 'Other',
          'externalStandard': 'External Standard'
        }[namespaceType];
      };


      /**
       * @name expandTree
       *
       * @description Fetches child elements for the top level accordion, if the data has not been previously loaded
       *
       * @param entity - The entity or my subset item being expanded
       */
      scope.expandTree = function expandTree(entity) {
        if (!entity.dataFound) {
          niemTree.getElementObjects(entity.type.elements).then(function(elementDocs) {
            entity.type.elements = elementDocs;
            entity.dataFound = true;
          });
        }
        entity.expanded = !entity.expanded;
      };


      /**
       * @name getSubset
       *
       * @description Sets scope variable to the element IDs in My subset
       */
      function getSubset() {
        scope.mySubsetIDs = mySubset.getSubset();
        if (scope.mySubsetIDs.length) {
          getSubsetArray();
        }
      }


      /**
       * @name getSubsetArray
       *
       * @description Sets the My subset array of IDs to an array of full documents for those elements
       */
      function getSubsetArray() {
        niemTree.getElementObjects(scope.mySubsetIDs).then(function(elementDocs) {
          scope.mySubsetArray = elementDocs;
        });
      }


      /**
       * @name downloadSchema
       *
       * @description Downloads all items in my schema to JSON file
       */
      scope.downloadSchema = function downloadSchema() {
        $window.ga('send', 'event', 'button', 'click', 'download-schema');
        scope.url = NODE_URL + 'itemsToExport[]=' + scope.mySubsetIDs.join('&itemsToExport[]=');
        $window.open(scope.url, '_parent');
      };


      /**
       * @name removeSubset
       *
       * @description Removes all items in my subset
       */
      scope.removeSubset = function removeSubset() {
        mySubset.removeAllFromSubset();
        scope.mySubsetArray = [];
      };
    }
  }
})();
