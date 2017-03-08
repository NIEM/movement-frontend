'use strict';

/**
 * @ngdoc factory
 *
 * @name niemTree
 *
 * @description
 * Factory for dhsniem
 */
(function () {

  angular
    .module('dhsniem')
    .factory('niemTree', niemTree);

  function niemTree(solrRequest, $q) {

    return {
      getElementObjects: getElementObjects,
      getDocById: getDocById
    };


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
      var orQueryString = ids.map(function (id) {
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
     * @name getElementObjects
     *
     * @description Fetches full element documents with full type doc references for a given list of elements
     *
     * @param elements - an array of elements
     *
     * @returns {Promise}
     */
    function getElementObjects(elements) {
      return getDocsByIds(elements).then(function (elementDocs) {

        elementDocs = elementDocs.filter(function (elementDoc) {
          return elementDoc.isBG;
        });

        return $q.all(elementDocs.map(function (elementDoc) {
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
    }


    /**
     * @name getSearchParams
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

  }

})();

