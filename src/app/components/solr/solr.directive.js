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
        solrUrl: '@',
        docs: '=',
        numFound: '=',
      },
      restrict: 'E',
      controller: 'ResultsCtrl',
      controllerAs: 'ResultsCtrl',
      bindToController: true,
      link: link
    };

    /**
     *  Defines variables and functions within solr scope
     */
    function link(scope, element, attrs, ctrl) { }

  }

})();