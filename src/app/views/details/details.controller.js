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

      var id = $location.search().entityID;
      var query = 'id:' + id.split(':')[0] + '\\:' + id.split(':')[1];

      solrRequest.makeSolrRequest(getSearchParams(query)).then(function(data) {
        vm.entity = data.response.docs[0];

        if (vm.entity.entityType === 'Element') {
          getContainingTypes();
        }

      });

    }


    /**
     * @name getContainingTypes
     *
     * @memberof dhsniem.controller:DetailsCtrl
     *
     * @description Retrieves the containing type documents for an element
     */
    function getContainingTypes() {
      var query = 'elements:*' + vm.entity.name + '*';
      solrRequest.makeSolrRequest(getSearchParams(query)).then(function(data) {
        vm.containingTypes = data.response.docs;

        // Example code to return the first iteration of nested structure
        // if (vm.containingTypes) {
        //   getElementObjects(vm.containingTypes[0]);
        //   console.log(vm.containingTypes);
        // }
      });      
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
    function getElementObjects(typeDoc) {
      typeDoc.elements.forEach(function(element, index, arr) {
        var query = 'name:' + element.split(':')[1];
        solrRequest.makeSolrRequest(getSearchParams(query)).then(function(data) {
          arr[index] = data.response.docs[0];

          if (arr[index].type) {
            getTypeObject(arr[index]);
          } else {
            arr[index].type = 'abstract';
          }

        });
      });
    }


    /**
     * @name getTypeObject
     *
     * @memberof dhsniem.controller:DetailsCtrl
     *
     * @description Returns the full type object for an element's type field
     *
     * @param element
     *
     * @return The full Type document referenced from the Element type field
     */
    function getTypeObject(element) {
      var query = 'name:' + element.type.split(':')[1];
      solrRequest.makeSolrRequest(getSearchParams(query)).then(function(data) {
        element.type = data.response.docs[0];
      });
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


    init();

  }

})();