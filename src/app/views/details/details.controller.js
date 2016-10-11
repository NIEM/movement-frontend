'use strict';

/**
 * @ngdoc controller
 *
 * @name DetailsCtrl
 *
 * @description
 * Controller for Search Results Page of dhsniem app
 */
(function() {

  angular
    .module('dhsniem')
    .controller('DetailsCtrl', DetailsCtrl);

  function DetailsCtrl(solrRequest, $location) {

    var vm = this;


    /**
     * @name init
     *
     * @memberof dhsniem.controller:DetailsCtrl
     *
     * @description Initializes controller, retrieves data for the specific entity
     */
    function init() {

      solrRequest.makeSolrRequest(getEntityParams()).then(function(data) {
        vm.entity = data.response.docs[0];

        if (vm.entity.entityType === 'Element') {
          solrRequest.makeSolrRequest(getContainingTypesParams()).then(function(data) {
            vm.containingTypes = data.response.docs;
          });
        }

      });

    }


    /**
     * @name getEntityParams
     *
     * @memberof dhsniem.controller:DetailsCtrl
     *
     * @description Buidls the search params to retrieve details data for the specific entity
     */
    function getEntityParams() {

      var id = $location.search().entityID;
      var q = id.split(':')[0] + '\\:' + id.split(':')[1];

      var params = {
        'q': 'id:' + q,
        'wt': 'json',
        'json.wrf': 'JSON_CALLBACK',
        'json.nl': 'map'
      };

      return params;
    }


    /**
     * @name getContainingTypesParams
     *
     * @memberof dhsniem.controller:DetailsCtrl
     *
     * @description Buidls the search params to retrieve the containing types for an element
     */
    function getContainingTypesParams() {

      var params = {
        'q': 'elements:*' + vm.entity.name + '*',
        'wt': 'json',
        'json.wrf': 'JSON_CALLBACK',
        'json.nl': 'map'
      };

      return params;
    }


    init();

  }

})();