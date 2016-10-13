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
        console.log(vm.entity);

        if (!!vm.entity.facets) {
          vm.entity.facets.enumerations = JSON.parse(vm.entity.facets[0]);

          if (!!vm.entity.facets.enumerations.enumeration.facetValue) {
            var facetValueData = vm.entity.facets.enumerations.enumeration.facetValue.split(',');
            var lastValue = facetValueData[facetValueData.length - 1];

            //remove the braces from the first and last strings
            facetValueData[0] = facetValueData[0].substring(1);
            facetValueData[facetValueData.length - 1] = lastValue.substring(0, lastValue.length - 1);

            //trim out any unneeded spaces
            for (var i = 0; i < facetValueData.length; i++) {
              facetValueData[i].trim();
            }

            //finally add new data
            vm.entity.facets.enumerations.enumeration.facetValuesData = facetValueData;
          }

          if (!!vm.entity.facets.enumerations.enumeration.facetDefinition) {
            var facetDefinitionData = vm.entity.facets.enumerations.enumeration.facetDefinition.split(',');
            var lastDefinition = facetDefinitionData[facetDefinitionData.length - 1];

            //remove the braces from the first and last strings
            facetDefinitionData[0] = facetDefinitionData[0].substring(1);
            facetDefinitionData[facetDefinitionData.length - 1] = lastDefinition.substring(0, lastDefinition.length - 1);

            //trim out any unneeded spaces
            for (var i = 0; i < facetDefinitionData.length; i++) {
              facetDefinitionData[i].trim();
            }

            vm.entity.facets.enumerations.enumeration.facetDefinitionsData = facetDefinitionData;
          }
        }

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

    /**
     * @name isElement
     *
     * @memberof dhsniem.controller:DetailsCtrl
     *
     * @description Determines if details page contains an element
     *
     * * @returns boolean
     */
    function isElement() {
      return !!vm.entity.type && !!vm.entity.abstract;
    }

    /**
     * @name isSimpleType
     *
     * @memberof dhsniem.controller:DetailsCtrl
     *
     * @description Determines if details page contains a simple type
     *
     * * @returns boolean
     */
    function isSimpleType() {
      return !!vm.entity.facets;
    }


    init();

  }

})();
