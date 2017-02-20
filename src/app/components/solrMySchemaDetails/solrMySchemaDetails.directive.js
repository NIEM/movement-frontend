'use strict';

/**
 * @ngdoc directive
 *
 * @name solrMySchemaDetails
 *
 * @description
 * Solr my schema details
 */
(function() {

  angular
    .module('dhsniem')
    .directive('solrMySchemaDetails', solrMySchemaDetails);

  function solrMySchemaDetails() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/solrMySchemaDetails/solrMySchemaDetails.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within solr scope
     */
    function link() {

      /**
       * @name init
       *
       * @description Initializes the view to set scope variables on page load and whenever a new search is triggered.
       */
      function init() {
      }

      init();

    }
  }
})();
