'use strict';

/**
 * @ngdoc factory
 *
 * @name solrSearch
 *
 * @description
 * Factory for Solr Search
 */
(function () {

  angular
    .module('dhsniem')
    .factory('solrSearch', solrSearch);

  function solrSearch($q, $http) {

    return {
      search: search
    };

    function search(url, params) {

      var deferred = $q.defer();

      $http.jsonp(url, {params: params}).then(function(response) {
        deferred.resolve(response.data);
      }).catch(function(error) {
        console.log('Error: ', error);
      });

      return deferred.promise;

    }

  }

})();

