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

  function DetailsCtrl(solrSearch, $location) {

    var vm = this;


    /**
     * @name init
     *
     * @memberof dhsniem.controller:DetailsCtrl
     *
     * @description Initializes controller, retrieves data for the specific entity
     */
    function init() {

      solrSearch.makeSolrRequest(buildSearchParams()).then(function(data) {
        vm.entity = data.response.docs[0];
      });

    }


    /**
     * @name buildSearchParams
     *
     * @memberof dhsniem.controller:DetailsCtrl
     *
     * @description Buidls the search params to retrieve details data for the specific entity
     */
    function buildSearchParams() {

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

    init();

  }

})();