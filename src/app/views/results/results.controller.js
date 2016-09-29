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

  function ResultsCtrl($http, $location) {
    
    var vm = this;

    // vm.facet_fields = {};
    // vm.selected_facets=[];


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

      // selectedFacets = this.selected_facets;
      // if (selectedFacets) {
      //   params['fq'] = selectedFacets;
      // }

      // if ($scope.facet_group) {
      //   params['facet.field'] = $scope.facet_group.listFields();
      // }

      return params;

    }


    /**
     * @name search
     *
     * @memberof dhsniem.controller:ResultsCtrl
     *
     * @description Performs the solr search via an $http jsonp request with built params object. On success, returns the total count and document list.
     */
    vm.search = function() {

      $http.jsonp(vm.solrUrl, { params: buildSearchParams(), cache: true}).success(function(data) {

        // vm.facet_fields = data.facet_counts.facet_fields;

        vm.docs = data.response.docs;
        vm.numFound = data.response.numFound;

        // vm.selected_facets = vm.getSelectedFacets();
        // vm.selected_facets_obj = vm.getSelectedFacetsObjects();
      });
    };


    // this.setFacetGroup = function(newGroup) {
    //   $scope.facet_group = newGroup;
    // }

    // this.getSelectedFacetsObjects = function() {
    //   var retValue = [];
    //   this.selected_facets.forEach(function(value, key) {
    //     split_val = value.split(':');
    //     retValue.push({
    //       field: split_val[0],
    //       value: split_val[1].replace(/"/g, "")
    //     });
    //   });
    //   return retValue;
    // };

    // this.getSelectedFacets = function() {
    //   selected = $location.search().selected_facets;
    //   selectedFacets = [];

    //   if (angular.isArray(selected)) {
    //     selectedFacets = selected;
    //   } else {
    //     if (selected) {
    //       selectedFacets.push(selected);
    //     }
    //   }
    //   return selectedFacets;
    // };

    // this.selected_facets = this.getSelectedFacets();
    // this.selected_facets_obj = this.getSelectedFacetsObjects();


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
