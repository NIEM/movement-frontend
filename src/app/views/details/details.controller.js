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
