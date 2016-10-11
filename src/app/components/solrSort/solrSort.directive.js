'use strict';

/**
 * @ngdoc directive
 *
 * @name solrSort
 *
 * @description
 * Sort bar on results page
 */
(function() {

  angular
    .module('dhsniem')
    .directive('solrSort', solrSort);

  function solrSort() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/solrSort/solrSort.directive.html',
      link: link
    };

  }

  /**
   *  Defines variables and functions within solrSort scope
   *
   */
  function link(scope) {
    scope.sortOption = 'Namespace';
  }

})();
