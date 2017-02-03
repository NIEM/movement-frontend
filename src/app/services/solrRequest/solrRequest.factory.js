'use strict';

/**
 * @ngdoc factory
 *
 * @name solrRequest
 *
 * @description
 * Factory for Solr Request
 */
(function () {

  angular
    .module('dhsniem')
    .factory('solrRequest', solrRequest);

  function solrRequest($q, $http, SOLR_URL) {

    return {
      makeSolrRequest: makeSolrRequest,
      makeFacetSolrRequest: makeFacetSolrRequest
    };


    /**
     * @name makeSolrRequest
     *
     * @memberof dhsniem.service:solrRequest
     *
     * @description Makes http jsonp call to the SOLR_URL and returns a promise.
     *
     * @returns deferred.promise
     */
    function makeSolrRequest(params) {

      var deferred = $q.defer();

      $http.jsonp(SOLR_URL, {params: params}).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(error) {
        console.log('Error: ', error);
      });

      return deferred.promise;
    }

    /**
     * @name makeFacetSolrRequest
     *
     * @memberof dhsniem.service:solrRequest
     *
     * @description Makes http jsonp call to the SOLR_URL and returns a promise.
     *
     * @returns deferred.promise
     */
    function makeFacetSolrRequest(params) {

      var deferred = $q.defer();

      $http.jsonp(SOLR_URL, {params: params}).then(function(response) {
        deferred.resolve(response.data.facet_counts.facet_fields);
      }).catch(function(error) {
        console.log('Error: ', error);
      });

      return deferred.promise;
    }


  }

})();
