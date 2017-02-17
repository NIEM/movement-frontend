'use strict';

/**
 * @ngdoc directive
 *
 * @name solrDetails
 *
 * @description
 * Solr details
 */
(function () {

  angular
    .module('dhsniem')
    .directive('solrDetails', solrDetails);

  function solrDetails(solrRequest, $location, $window, $q) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/solrDetails/solrDetails.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within solrDetails scope
     */
    function link(scope) {


      /**
       * @name init
       *
       * @memberof dhsniem.controller:DetailsCtrl
       *
       * @description Initializes controller, retrieves data for the specific entity
       */
      function init() {
        scope.doc = {
          id: $location.search().entityID
        };

        var query = 'id:' + scope.doc.id.split(':')[0] + '\\:' + scope.doc.id.split(':')[1];

        solrRequest.makeSolrRequest(getSearchParams(query)).then(function (data) {
          scope.entity = data.response.docs[0];
          scope.formattedNamespaceType = formatNamespaceType(scope.entity.namespaceType);
          if (scope.entity.type) {
            getTypeObject(scope.entity).then(function (data) {
              scope.entity.type = data;
              if (data.elements) {
                scope.getElementObjects(scope.entity.type);
              }
            });
          }
          $window.document.title = scope.entity.name + ' - CCP Details';
        });
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
       * @name goBack
       *
       * @memberof dhsniem.controller:DetailsCtrl
       *
       * @description Navigates back to the search results page with previous search params
       */
      scope.goBack = function () {
        $window.history.back();
      };

      init();
    }
  }
})();
