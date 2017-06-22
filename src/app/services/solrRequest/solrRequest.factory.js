'use strict';

/**
 * @ngdoc factory
 * @memberof dhsniem
 * @name solrRequest
 * @param {service} $q A service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing
 * @param {service} $http The $http service is a core AngularJS service that facilitates communication with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP
 * @param {constant} SOLR_URL The URL endpoint to hit Solr
 * @description Factory for Solr Request
 */
(function () {

  angular
    .module('dhsniem')
    .factory('solrRequest', solrRequest);

  function solrRequest($q, $http, SOLR_URL) {

    return {
      makeSolrRequest: makeSolrRequest,
      getDomains: getDomains
    };


    /**
     * @memberof solrRequest
     * @param params Parameters for the Solr request
     * @returns {Promise} A promise resolved with the Solr response
     * @description Makes http jsonp call to the SOLR_URL and returns a promise.
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
     * @memberof solrRequest
     * @returns {Promise} A promise resolved with an array of domains
     * @description Makes http jsonp call to get a list of all domains
     */
    function getDomains() {
      var params = {
        'q': '*',
        'facet': 'on',
        'facet.mincount': '1',
        'json.wrf': 'JSON_CALLBACK',
        'json.nl': 'map',
        'facet.field': '{!ex=domaintag}domain',
        'rows': 0
      };

      var deferred = $q.defer();

      $http.jsonp(SOLR_URL, {params: params}).then(function(response) {
        deferred.resolve(response.data.facet_counts.facet_fields.domain);
      }).catch(function(error) {
        console.log('Error: ', error);
      });

      return deferred.promise;
    }

  }

})();
