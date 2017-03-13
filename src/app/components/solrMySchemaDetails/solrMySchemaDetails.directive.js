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

      /**
       * @name init
       *
       * @description Initializes the view to set scope variables on page load and whenever a new search is triggered.
       */
      function init() {
        $window.document.title = 'My Schema - Open Source Tool';
        getSchema();
      }

      init();


      /**
       * @name formatNamespaceType
       *
       * @description transform the Namespace type returned into readable text
       *
       * @param text - String representing the type of Namespace
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
       * @description While expanding the accordion via uib-accordion, will also make call to get the children elements
       *
       * @param entity - The entity or my schema item being expanded
       */
      scope.expandTree = function expandTree(entity) {
        if (!entity.dataFound) {
          niemTree.getElementObjects(entity.type.elements).then(function(elementDocs) {
            entity.type.elements = elementDocs;
          });
          entity.dataFound = true;
        }
        entity.expanded = !entity.expanded;
      };


      /**
       * @name getSchema
       *
       * @description Returns the element IDs in my schema
       */
      function getSchema() {
        scope.mySchemaIDs = mySchema.getSchema();
        scope.mySchemaArray = [];
        if (scope.mySchemaIDs) {
          getSchemaArray();
        }
      }


      /**
       * @name getSchemaArray
       *
       * @description Calls solr and returns information about each of the elements in my schema
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
       * @name removeFromSchema
       *
       * @description Removes a particular item from the mySchema array
       */
      scope.removeFromSchema = function removeFromSchema(elementID) {
        scope.mySchemaArray = scope.mySchemaArray.filter(function(schemaElement) {
          return schemaElement.id !== elementID;
        });
      };


      /**
       * @name removeSchema
       *
       * @description Removes all items in my schema
       */
      scope.removeSchema = function removeSchema() {
        mySchema.removeAllFromSchema();
        getSchema();
      };
    }
  }
})();
