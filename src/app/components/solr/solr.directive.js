'use strict';

/**
 * @ngdoc directive
 *
 * @name solr
 *
 * @description
 * Wrapper for Solr instantiation
 */
(function() {

  angular
    .module('dhsniem')
    .directive('solr', solr);

  function solr() {
    return {
      scope: {
        solrUrl: '=',
        docs: '=',
        preload: '=',
        numFound: '=',
      },
      restrict: 'E',
      controller: SolrCtrl,
      // controllerAs: 'vm',
      // require: 'solr',
      link: link
    };

    /**
     *  Defines variables and functions within solr scope
     */
    function link(scope, element, attrs, ctrl) {
      ctrl.solrUrl = scope.solrUrl;
    }

  }


  function SolrCtrl($scope, $http, $location) {

    var vm = this;

    // vm.facet_fields = {};
    // vm.selected_facets=[];

    vm.getQuery = function() {
      return $location.search().q || '*';
    };

    vm.buildSearchParams = function() {
      var params = {
        'q': vm.getQuery(),
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

    };

    vm.search = function(query) {

      $http.jsonp(vm.solrUrl, { params: vm.buildSearchParams(), cache: true}).success(function(data) {

        // vm.facet_fields = data.facet_counts.facet_fields;
        $scope.docs = data.response.docs;
        $scope.numFound = data.response.numFound;

        // vm.selected_facets = vm.getSelectedFacets();
        // vm.selected_facets_obj = vm.getSelectedFacetsObjects();
      });
    };


    $scope.search = vm.search;

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

    $scope.$watch(function() {
      return $location.search();
    }, function(newVal, oldVal) {
      if (newVal !== oldVal) {
        vm.search();
      }
    }, true);   

  }

})();
