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

  function solrMySchemaDetails(solrRequest, $window, $q, mySchemaCart, NODE_URL) {
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
        scope.isOpen = false;

        getSchemaFromService();

      }

      init();


      /**
       * @name expandDetails
       *
       * @description Accordion for my schema page
       */
      scope.expandDetails = function () {
        scope.isOpen = !scope.isOpen;
      };


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
          'wt': 'json',
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


      function getSchemaFromService() {
        scope.mySchemaArray = mySchemaCart.getSchema();
        console.log(scope.mySchemaArray);

        scope.mySchemaArrayDetails = [];


        if (scope.mySchemaArray) {

          scope.mySchemaArray.forEach(function (element) {

            var query = 'id:' + element.split(':')[0] + '\\:' + element.split(':')[1];

            solrRequest.makeSolrRequest(getSearchParams(query)).then(function (data) {
              scope.entity = data.response.docs[0];
              console.log(scope.entity);

              scope.mySchemaArrayDetails.push(scope.entity);
              console.log(scope.mySchemaArrayDetails);

              scope.formattedNamespaceType = formatNamespaceType(scope.entity.namespaceType);

              if (scope.entity.type) {
                getTypeObject(scope.entity).then(function (data) {
                  scope.entity.type = data;
                  console.log(data);
                  if (data.elements) {
                    scope.getElementObjects(scope.entity.type);
                  }
                });
              }
              $window.document.title = scope.entity.name + ' - CCP Details';
            });

          });
        }

      }


      scope.downloadSchema = function downloadSchema() {
        var schemaString = 'itemsToExport[]=' + scope.mySchemaArray.join('&itemsToExport[]=');
        scope.url = NODE_URL + schemaString;
        console.log(scope.url);
        $window.open(scope.url, '_parent');
      };

      scope.removeSchema = function removeSchema() {
        mySchemaCart.removeFromSchema();
        scope.mySchemaArrayDetails = [];
      }


    }
  }
})();
