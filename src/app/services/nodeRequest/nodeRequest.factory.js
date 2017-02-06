// 'use strict';
//
// /**
//  * @ngdoc factory
//  *
//  * @name nodeRequest
//  *
//  * @description
//  * Factory for Node Request
//  */
// (function () {
//
//   angular
//     .module('dhsniem')
//     .factory('nodeRequest', nodeRequest);
//
//   function nodeRequest($q, $http, NODE_URL) {
//
//     return {
//       makeNodeRequest: makeNodeRequest,
//       makeFacetNodeRequest: makeFacetNodeRequest
//     };
//
//
//     /**
//      * @name makeNodeRequest
//      *
//      * @memberof dhsniem.service:nodeRequest
//      *
//      * @description Makes http jsonp call to the NODE_URL and returns a promise.
//      *
//      * @returns deferred.promise
//      */
//     function makeNodeRequest(itemsToExport) {
////
//       var deferred = $q.defer();
//
//       var test_node_url = 'http://35.164.75.93:7000/api/jsonschema?';
//
//       $http.jsonp(test_node_url + itemsToExport).then(function(response) {
//         deferred.resolve(response.data);
//       }).catch(function(error) {
//         console.log('Error: ', error);
//       });
//
//       return deferred.promise;
//     }
//
//   }
//
// })();
