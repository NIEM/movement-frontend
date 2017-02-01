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
      vm.transformNamespaceText = transformNamespaceText;



      solrRequest.makeSolrRequest(getSearchParams(query)).then(function (data) {

        // Current entity is first (and should be only) item returned
        vm.entity = data.response.docs[0];
        
        $window.document.title = vm.entity.name + ' - CCP Details';

        
        // if (!!vm.entity.facets) {
        //   var newFacets = vm.entity.facets;
        //   vm.entity.facets = [];
        //   for (var i = 0; i < newFacets.length; i++) {
        //     var data = JSON.parse(newFacets[i]);

        //     //if data is an array, use regular for loop

        //     var fieldDataArray;
        //     var lastValue;
        //     //if data is an object, use for-in loop
        //     if (typeof(data) === 'object') {

        //       for (var facet in data) {

        //         for (var fieldName in data[facet]) {

        //           fieldDataArray = data[facet][fieldName].split(',');
        //           lastValue = fieldDataArray[fieldDataArray.length - 1];

        //           //trim off brackets from original string, as well as unneccesary whitespace
        //           fieldDataArray[0] = fieldDataArray[0].substring(1);
        //           fieldDataArray[fieldDataArray.length - 1] = lastValue.substring(0, lastValue.length - 1);
        //           data[facet][fieldName] = fieldDataArray;
        //         }
        //         vm.entity.facets.push({
        //           name: facet,
        //           data: data[facet]
        //         });

        //       }
        //     }
        //   }
        // }

      });

    }


    /**
     * @name transformNamespaceText
     *
     * @memberOf dhsniem.controller:DetailsCtrl
     *
     * @description transform the Namespace type returned into readable text
     *
     * @param text - String representing the type of Namespace
     *
     * @returns {string}
     */
    function transformNamespaceText(text) {

      var nsMapping = {
        'domain': 'Domain',
        'otherNamespace': 'Other',
        'externalStandard': 'External Standard'
      };

      return nsMapping[text];
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
