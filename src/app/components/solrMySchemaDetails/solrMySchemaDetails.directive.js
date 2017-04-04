'use strict';

/**
 * @ngdoc directive
 *
 * @name solrMySchemaDetails
 *
 * @description
 * Solr my schema details
 */
(function () {

  angular
    .module('dhsniem')
    .directive('solrMySchemaDetails', solrMySchemaDetails);

  function solrMySchemaDetails($window, mySchema, NODE_URL, niemTree) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/solrMySchemaDetails/solrMySchemaDetails.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within solr scope
     */
    function link(scope) {
      scope.$on('updatedMySchemaArray', function (event, args) {
        scope.mySchemaArray = args;
      });

      /**
       * @name init
       *
       * @description Retrieves My Schema
       */
      function init() {
        $window.document.title = 'My Schema Builder - NIEM Movement';
        getSchema();
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
       * @param entity - The entity or my schema item being expanded
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
       * @name getSchema
       *
       * @description Sets scope variable to the element IDs in My Schema
       */
      function getSchema() {
        scope.mySchemaIDs = mySchema.getSchema();
        if (scope.mySchemaIDs) {
          getSchemaArray();
        }
      }


      /**
       * @name getSchemaArray
       *
       * @description Sets the My Schema array of IDs to an array of full documents for those elements
       */
      function getSchemaArray() {
        niemTree.getElementObjects(scope.mySchemaIDs).then(function(elementDocs) {
          scope.mySchemaArray = elementDocs;
        });
      }


      /**
       * @name downloadSchema
       *
       * @description Downloads all items in my schema to JSON file
       */
      scope.downloadSchema = function downloadSchema() {
        scope.url = NODE_URL + 'itemsToExport[]=' + scope.mySchemaIDs.join('&itemsToExport[]=');
        $window.open(scope.url, '_parent');
      };


      /**
       * @name removeSchema
       *
       * @description Removes all items in my schema
       */
      scope.removeSchema = function removeSchema() {
        mySchema.removeAllFromSchema();
        scope.mySchemaIDs = [];
        scope.mySchemaArray = [];
      };
    }
  }
})();
