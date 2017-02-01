'use strict';

/**
 * @ngdoc controller
 *
 * @name DetailsCtrl
 *
 * @description
 * Controller for Search Results Page of dhsniem app
 */
(function () {

  angular
    .module('dhsniem')
    .controller('DetailsCtrl', DetailsCtrl);

  function DetailsCtrl(solrRequest, $location, $window) {

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

      vm.getElementObjects = getElementObjects;

      solrRequest.makeSolrRequest(getSearchParams(query)).then(function (data) {

        vm.entity = data.response.docs[0];
        vm.formattedNamespaceType = formatNamespaceType(vm.entity.namespaceType);
        vm.getTypeObject(vm.entity);
        
        $window.document.title = vm.entity.name + ' - CCP Details';
      });
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
     * @memberof dhsniem.controller:DetailsCtrl
     *
     * @description Modifies a Type object's element array from a string reference to full Element objects
     *
     * @param typeDoc - type object (document)
     */
    function getElementObjects(typeDoc) {
      typeDoc.elements.forEach(function (element, index, arr) {
        var query = 'name:' + element.split(':')[1];
        solrRequest.makeSolrRequest(getSearchParams(query)).then(function (data) {
          arr[index] = data.response.docs[0];

          if (arr[index].type) {
            getTypeObject(arr[index]);
          } else {
            arr[index].type = 'abstract';
          }
          arr[index].element = element; //preserves the original string
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
     */
    function getTypeObject(element) {
      var query = 'name:' + element.type.split(':')[1];
      solrRequest.makeSolrRequest(getSearchParams(query)).then(function (data) {
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

    /**
     * @name goBack
     *
     * @memberof dhsniem.controller:DetailsCtrl
     *
     * @description Navigates back to the search results page with previous search params
     */
    vm.goBack = function () {
      $window.history.back();
    };

    init();

  }

})();
