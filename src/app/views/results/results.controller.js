'use strict';

/**
 * @ngdoc controller
 *
 * @name ResultsCtrl
 *
 * @description
 * Controller for Search Results Page of dhsniem app
 */
(function() {

  angular
    .module('dhsniem')
    .controller('ResultsCtrl', ResultsCtrl);

  function ResultsCtrl($http, $location, solrSearch) {

    var vm = this;

    vm.facets = {};
    vm.facetFields = {};
    vm.selectedFacets = [];
    vm.selectedFacets = getSelectedFacets();


    /**
     * @name getQuery
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Returns the query (q) param from $location
     */
    vm.getQuery = function() {
      return $location.search().q || '*';
    };


    /**
     * @name buildSearchParams
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Dynamically builds the search params for a jsonp $http request to the solr instance.
     */
    function buildSearchParams() {
      var params = {
        'q': vm.getQuery(),
        'facet': 'on',
        'facet.mincount': '1',
        'wt': 'json',
        'json.wrf': 'JSON_CALLBACK',
        'json.nl': 'map'
      };

      if (vm.selectedFacets) {
        params['fq'] = groupSelectedFacets();
      }

      if (vm.facetGroup) {
        params['facet.field'] = listFields();
      }

      return params;

    }


    /**
     * @name search
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Performs the solr search via solrSearch service. On success, sets response data to the vm.
     */
    vm.search = function() {

      var query = vm.getQuery();

      solrSearch.search(vm.solrUrl, buildSearchParams()).then(function(data) {
        
        $location.search('q', query);

        vm.docs = data.response.docs;
        vm.numFound = data.response.numFound;

        vm.facetFields = data.facet_counts.facet_fields;
        vm.selectedFacets = getSelectedFacets();

      });

    };


    /**
     * @name setFacetGroup
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Sets the facet group to the scope of the solrFacetGroup directive.
     *
     * @param newGroup
     */
    vm.setFacetGroup = function(newGroup) {
      vm.facetGroup = newGroup;
    };


    /**
     * @name registerFacet
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Sets the vm.facets object with a key and value of a facet field and its scope from the solrFacet directive, respectively.
     *
     * @param facet
     */
    vm.registerFacet = function(facet) {
      vm.facets[facet.field] = facet;
    };


    /**
     * @name getFacets
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Returns the vm.facets object.
     *
     * @retursn vm.facets
     */
    vm.getFacets = function() {
      return vm.facets;
    };


    /**
     * @name setFacetResult
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Sets the results (possible filter values) to the respective facet field name on the vm.facets object.
     */
    vm.setFacetResult = function(facetKey, facetResults) {
      for (var key in vm.facets) {
        if (vm.facets[key].field === facetKey) {
          vm.facets[key].results = facetResults;
        }
      }
    };


    /**
     * @name listFields
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Iterates over the vm.facets object to return an array of the fields to be used as facets.
     *
     * @returns fields - an array of the facet fields
     */
    function listFields() {
      var fields = [];
      var excludeTag;
      for (var k in vm.facets) {
        excludeTag = '{!ex=' + vm.facets[k].field + 'tag}';
        fields.push(excludeTag + vm.facets[k].field);
      }
      return fields;
    }


    /**
     * @name groupSelectedFacets
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Loops through the selected facets and groups the same facet values under the same facet name. Adds the exclude tag to make the array ready for the solr search param, fq.
     *
     * @returns groupedFacets - an array of the facet values grouped by facet name in query with exclude format, e.g. ['{!tag=domaintag}domain:Biometrics Justice Intelligence']
     */
    function groupSelectedFacets() {

      var facetGroups = {};
      var facetKey;
      var facetVal;
      var groupedFacets = [];
      var groupedFacetString;

      vm.selectedFacets.forEach(function(selectedFacet) {
        facetKey = selectedFacet.split(':')[0];
        facetVal = selectedFacet.split(':')[1];

        if (facetGroups[facetKey]) {
          facetGroups[facetKey] = facetGroups[facetKey].concat(' ').concat(facetVal);
        } else {
          facetGroups[facetKey] = facetVal;
        }
      });

      Object.keys(facetGroups).forEach(function(key) {
        groupedFacetString = '{!tag=' + key + 'tag}' + key + ':' + facetGroups[key];
        groupedFacets.push(groupedFacetString);
      });

      return groupedFacets;
    }


    /**
     * @name getSelectedFacets
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Returns an array of the selected facets from $location selected_facets param(s)
     *
     * @returns selectedFacets - an array of the facets
     */
    function getSelectedFacets() {
      var selected = $location.search().selectedFacets;
      var selectedFacets = [];

      if (angular.isArray(selected)) {
        selectedFacets = selected;
      } else if (selected) {
        selectedFacets.push(selected);
      }
      return selectedFacets;
    }

  }

})();