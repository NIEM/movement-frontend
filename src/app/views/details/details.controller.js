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

  function DetailsCtrl(solrRequest, $location, $window, $q) {

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

        getTypeObject(vm.entity).then(function (data) {
          vm.entity.type = data;
          if (data.elements) {
            getElementObjects(vm.entity.type);
          }
        });
        
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
            getTypeObject(arr[index]).then(function (data) {
              arr[index].type = data;
            });
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
     */
    function getTypeObject(element) {
      var deferred = $q.defer();
      var query = 'name:' + element.type.split(':')[1];

      solrRequest.makeSolrRequest(getSearchParams(query)).then(function (data) {
        deferred.resolve(data.response.docs[0]);
      });

      return deferred.promise;
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
