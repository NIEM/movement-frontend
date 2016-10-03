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

    // vm.selectedFacets = [];
    vm.selectedFacets = getSelectedFacets();
    vm.selectedFacetsObj = getSelectedFacetsObjects();


    /**
     * @name getQuery
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Returns the query (q) param from $location
     */
    function getQuery() {
      return $location.search().q || '*';
    }


    /**
     * @name buildSearchParams
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Dynamically builds the search params for a jsonp $http request to the solr instance.
     */
    function buildSearchParams() {
      var params = {
        'q': getQuery(),
        'facet': 'on',
        'facet.mincount': '1',
        'wt': 'json',
        'json.wrf': 'JSON_CALLBACK',
        'json.nl': 'map'
      };

      // var selectedFacets = vm.selectedFacets;
      // var selectedFacets =  ["{!tag=domaintag}domain:Chemical, Biological, Radiological, Nuclear International Trade"];
      var selectedFacets = getSelectedFacetsWithExcludes();

      if (selectedFacets) {
        params['fq'] = selectedFacets;
        console.log('SELCTED FACETS', selectedFacets);
        console.log('PARAMS FQ', params['fq']);
      }

      if (vm.facetGroup) {
        params['facet.field'] = listFields();
        console.log('FACET FIELD', listFields());
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

      solrSearch.search(vm.solrUrl, buildSearchParams()).then(function(data) {
        
        vm.docs = data.response.docs;
        vm.numFound = data.response.numFound;

        vm.facetFields = data.facet_counts.facet_fields;
        vm.selectedFacets = getSelectedFacets();
        vm.selectedFacetsObj = getSelectedFacetsObjects();
        
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
    vm.registerFacet = function(facet){
      vm.facets[facet.field]=facet;
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
     vm.getFacets =  function(){ return vm.facets;};
    

    /**
     * @name setFacetResult
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Sets the results (possible filter values) to the respective facet field name on the vm.facets object.
     */
    vm.setFacetResult = function(facetKey, facetResults){
      for (var k in vm.facets){
        if (vm.facets[k].field === facetKey){
          vm.facets[k].results = facetResults;
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
      var fields=[];
      var excludeTag;
      for (var k in vm.facets){
        excludeTag = '{!ex=' + vm.facets[k].field + 'tag}';
        fields.push(excludeTag + vm.facets[k].field);
      }
      return fields;
    }


    /**
     * @name getSelectedFacetsObjects
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Loops through the selected facets and parses out the field and value of each into a new object, each of which added to an array
     *
     * @returns selectedFacetsObjects - an array of the facets objects with the field and value properties (e.g. domain, niem-core)
     */
    function getSelectedFacetsObjects() {
      var selectedFacetsObjs = [];
      vm.selectedFacets.forEach(function(selectedFacet) {
        var splitVal = selectedFacet.split(':');
        selectedFacetsObjs.push({
          field: splitVal[0],
          value: splitVal[1].replace(/'/g, '')
        });
      });
      return selectedFacetsObjs;
    }


    function getSelectedFacetsWithExcludes() {

      var flags = {};
      var arr = [];

      vm.selectedFacets.forEach(function(selectedFacet) {
        var splitVal = selectedFacet.split(':');

        if (flags[splitVal[0]]) {
          flags[splitVal[0]] = flags[splitVal[0]].concat(' ').concat(splitVal[1]); //join the new one
        } else {
          flags[splitVal[0]] = splitVal[1];
        }
      });

      Object.keys(flags).forEach(function(key) {

        arr.push('{!tag='+key+'tag}'+key+':'+flags[key]);
      });

      return arr;
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


    //TODO: Implement back in for URL change searching; however, this causes a performance issue and currently makes several calls.
    // $scope.$watch(function() {
    //   return $location.search();
    // }, function(newVal, oldVal) {
    //   if (newVal !== oldVal) {
    //     vm.search();
    //   }
    // }, true);

  }

})();