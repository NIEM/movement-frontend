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

  function solrDetails(solrRequest, $location, $window) {
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

        var entityID = $location.search().entityID;
        $window.document.title = entityID + ' - CCP Details';

        getDocById(entityID).then(function (entityDoc) {
          scope.entity = entityDoc;
          scope.formattedNamespaceType = formatNamespaceType(scope.entity.namespaceType);
          if (scope.entity.type) {
            getDocById(scope.entity.type).then(function (typeDoc) {
              scope.entity.type = typeDoc;
              if (typeDoc.elements) {
                scope.getElementObjects(typeDoc.elements).then(function(elements) {
                  scope.entity.type.elements = elements;
                });
              }
            });
          }
        });
      }


      /**
       * @name getDocById
       *
       * @description Makes a request to Solr to retrieve the document for an entity ID.
       *
       * @param id - Unique ID of the NIEM entity
       *
       * @retruns {Promise} 
       */
      function getDocById(id) {
        var idQuery = 'id:' + splitId(id);
        return solrRequest.makeSolrRequest(getSearchParams(idQuery)).then(function (solrResponse) {
          return solrResponse.response.docs[0];
        });
      }


      /**
       * @name getDocsByIds
       *
       * @description Makes a request to Solr to retrieve n documents from n ids
       *
       * @param ids - Array of unique NIEM entity ids
       *
       * @retruns {Promise} 
       */
      function getDocsByIds(ids) {
        var orQueryString = ids.map( (id) => {
          return splitId(id);
        }).join(' OR ');
        var idsQuery = 'id:(' + orQueryString + ')';

        return solrRequest.makeSolrRequest(getSearchParams(idsQuery)).then(function (solrResponse) {
          return solrResponse.response.docs;
        });
      }


      /**
       * @name splitId
       *
       * @description Split an id to prepare it for a solr query with the colon
       *
       * @param id - A NIEM id
       *
       * @retruns {string} 
       */
      function splitId(id) {
        return id.split(':')[0] + '\\:' + id.split(':')[1];
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
       * @description Fetches full element documents with full type doc references for a given list of elements
       *
       * @param elements - an array of elements
       *
       * @returns {Promise}
       */
      scope.getElementObjects = function getElementObjects(elements) {

        return getDocsByIds(elements).then(function (elementDocs) {

          elementDocs = elementDocs.filter(function (elementDoc) {
            return elementDoc.isBG;
          });

          return Promise.all(elementDocs.map(function (elementDoc) {
            if (elementDoc.type) {
              return getDocById(elementDoc.type).then(function (typeDoc) {
                elementDoc.type = typeDoc;
                return elementDoc;
              });
            } else {
              return elementDoc;
            }
          }));
        });

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
