'use strict';

/**
 * @ngdoc factory
 * @memberof dhsniem
 * @name niemTree
 * @param {service} $q A service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing
 * @param {service} solrRequest A service that handles requests to the Solr API
 * @description Factory for the entity tree
 */
(function () {

  angular
    .module('dhsniem')
    .factory('niemTree', niemTree);

  function niemTree(solrRequest, $q) {

    return {
      getElementObjects: getElementObjects,
      getDocById: getDocById,
      getSubstitutionGroups: getSubstitutionGroups,
      getTypeDocsForElementDocs: getTypeDocsForElementDocs
    };


    /**
     * @memberof niemTree
     * @param {String} id Unique ID of the NIEM entity
     * @returns {Promise} A promise resolved with an entity document
     * @description Makes a request to Solr to retrieve the document for an entity ID.
     */
    function getDocById(id) {
      var idQuery = 'id:' + splitId(id);
      return solrRequest.makeSolrRequest(getSearchParams(idQuery)).then(function (solrResponse) {
        return solrResponse.response.docs[0];
      });
    }


    /**
     * @private
     * @param {String[]} ids Array of unique NIEM entity ids
     * @returns {Promise} A promise resolved with an array of entity documents
     * @description Makes a request to Solr to retrieve n documents from n ids
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
     * @private
     * @returns {String} 
     * @param {String} id A entity id
     * @description Split an id to prepare it for a solr query with the colon
     */
    function splitId(id) {
      return id.split(':')[0] + '\\:' + id.split(':')[1];
    }


    /**
     * @memberof niemTree
     * @param {String[]} elements An array of element ids
     * @returns {Promise} A promise resolved with an array of element documents
     * @description Fetches full element documents with full type doc references for a given list of elements
     */
    function getElementObjects(elements) {
      return getDocsByIds(elements).then(function (elementDocs) {

        elementDocs = elementDocs.filter(function (elementDoc) {
          return elementDoc.isBG;
        });

        return getTypeDocsForElementDocs(elementDocs);
      });
    }


    /**
     * @memberof niemTree
     * @param {Object[]} elementDocs An array of element documents
     * @returns {Promise} A promise resolved with an array of element documents with full type documents embedded
     * @description Fetches full element documents with full type doc references for a given list of elements
     */
    function getTypeDocsForElementDocs(elementDocs) {
        return $q.all(elementDocs.map(function (elementDoc) {
          if (elementDoc.type) {
            return getDocById(elementDoc.type).then(function (typeDoc) {
              elementDoc.type = typeDoc;
              return elementDoc;
            });
          } else {
            return getSubstitutionGroups(elementDoc.id).then(function(subGroupDocs) {
              if(subGroupDocs) {
                elementDoc.subGroups = subGroupDocs;
              }
              return elementDoc;
            });
          }
        }));
    }


    /**
     * @private
     * @param {String} query Search query for Solr
     * @return {Object} Params for solr search
     * @description Builds the search params for a solr query
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
     * @memberof niemTree
     * @param {String} elementId An element Id
     * @returns {Promise} A promise resolved with an array of full documents for an element's substitution group
     * @description For a given element id, checks to see if substitution groups exist for it. If subsitution groups are found, it calls the getElementObjects function.
     */
    function getSubstitutionGroups(elementId) {
      var sgQuery = 'substitutionGroup:' + splitId(elementId);
      return solrRequest.makeSolrRequest(getSearchParams(sgQuery)).then(function(solrResponse) {
        if (solrResponse.response.docs) {
          // return the array of substitution group element objects with full type doc refs
          return getTypeDocsForElementDocs(solrResponse.response.docs);
        }
      }).catch(function(err) {
        return;
      });
    }

  }

})();

