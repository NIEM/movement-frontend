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

  function solrMySchemaDetails(solrRequest, $window, $q, mySchema, NODE_URL) {
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
        getSchema();
      }

      init();


      /**
       * @name getSearchParams
       *
       * @memberof dhsniem.controller:DetailsCtrl
       *
       * @description Builds the search params for a solr query
       *
       * @param query
       *
       * @return params
       */
      function getSearchParams(query) {
        var params = {
          'q': query,
          'json.wrf': 'JSON_CALLBACK',
          'json.nl': 'map'
        };
        return params;
      }


      /**
       * @name formatNamespaceType
       *
       * @memberOf dhsniem.controller:DetailsCtrl
       *
       * @description transform the Namespace type returned into readable text
       *
       * @param text - String representing the type of Namespace
       *
       * @returns {string}
       */
      function formatNamespaceType(namespaceType) {
        var mapping = {
          'domain': 'Domain',
          'otherNamespace': 'Other',
          'externalStandard': 'External Standard'
        };

        return mapping[namespaceType];
      }


      /**
       * @name getElementObjects
       *
       * @memberof dhsniem.controller:DetailsCtrl
       *
       * @description Modifies a Type object's element array from a string reference to full Element objects
       *
       * @param typeDoc - type object (document)
       */
      scope.getElementObjects = function getElementObjects(typeDoc) {
        typeDoc.elements.forEach(function (element, index, arr) {
          var query = 'name:' + element.split(':')[1];
          solrRequest.makeSolrRequest(getSearchParams(query)).then(function (data) {
            arr[index] = data.response.docs[0];

            if (arr[index].type) {
              getTypeObject(arr[index]).then(function (data) {
                arr[index].type = data;
              });
            } else {
              arr[index].type = 'abstract';
            }
          });
        });
      };


      /**
       * @name getTypeObject
       *
       * @memberof dhsniem.controller:DetailsCtrl
       *
       * @description Returns the full type object for an element's type field
       *
       * @param element
       */
      function getTypeObject(element) {
        var deferred = $q.defer();
        var query = 'name:' + element.type.split(':')[1];
        solrRequest.makeSolrRequest(getSearchParams(query)).then(function (data) {
          deferred.resolve(data.response.docs[0]);
        });

        return deferred.promise;
      }


      /**
       * @name getSchema
       *
       * @memberof dhsniem.controller:DetailsCtrl
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
       * @memberof dhsniem.controller:DetailsCtrl
       *
       * @description Calls solr and returns information about each of the elements in my schema
       */
      function getSchemaArray() {

        scope.mySchemaIDs.forEach(function(element, index) {

          var query = 'id:' + scope.mySchemaIDs[index].split(':')[0] + '\\:' + scope.mySchemaIDs[index].split(':')[1];

          solrRequest.makeSolrRequest(getSearchParams(query)).then(function (data) {
            var entity = data.response.docs[0];
            entity.typeString = data.response.docs[0].type;
            scope.mySchemaArray.push(entity);

            scope.formattedNamespaceType = formatNamespaceType(entity.namespaceType);

            $window.document.title = 'My Schema';

          });
        });
      }


      /**
       * @name getSchemaDetails
       *
       * @memberof dhsniem.controller:DetailsCtrl
       *
       * @description Returns the type details for each item in my schema
       */
      scope.getSchemaDetails = function getSchemaDetails(){

        scope.mySchemaArray.forEach(function(element, index) {
          if (scope.mySchemaArray[index].type) {
            getTypeObject(scope.mySchemaArray[index]).then(function (data) {
              scope.mySchemaArray[index].type = data;
              if (data.elements) {
                scope.getElementObjects(scope.mySchemaArray[index].type);
              }
            });
          }
        });
      };


      /**
       * @name downloadSchema
       *
       * @memberof dhsniem.controller:DetailsCtrl
       *
       * @description Downloads all items in my schema to JSON file
       */
      scope.downloadSchema = function downloadSchema() {
          var schemaString = 'itemsToExport[]=' + scope.mySchemaIDs.join('&itemsToExport[]=');
          scope.url = NODE_URL + schemaString;
          $window.open(scope.url, '_parent');
      };


      /**
       * @name removeSchema
       *
       * @memberof dhsniem.controller:DetailsCtrl
       *
       * @description Removes all items in my schema
       */
      scope.removeSchema = function removeSchema() {
        mySchema.removeAllFromSchema();
          scope.mySchemaIDs = '';
          scope.mySchemaArray = '';
      }
    }
  }
})();
