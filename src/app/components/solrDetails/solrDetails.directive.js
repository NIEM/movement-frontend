'use strict';

/**
 * @ngdoc directive
 *
 * @name solrDetails
 *
 * @description
 * Solr details
 */
(function () {

  angular
    .module('dhsniem')
    .directive('solrDetails', solrDetails);

  function solrDetails(niemTree, $location, $window) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/solrDetails/solrDetails.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within solrDetails scope
     */
    function link(scope) {

      /**
       * @name init
       *
       * @description Initializes controller, retrieves data for the specific entity
       */
      function init() {

        var entityID = $location.search().entityID;
        $window.document.title = entityID + ' Details - Open Source Tool';

        niemTree.getDocById(entityID).then(function (entityDoc) {
          scope.entity = entityDoc;
          scope.formattedNamespaceType = formatNamespaceType(scope.entity.namespaceType);
          if (scope.entity.type) {
            niemTree.getDocById(scope.entity.type).then(function (typeDoc) {
              scope.entity.type = typeDoc;
              if (typeDoc.elements) {
                niemTree.getElementObjects(typeDoc.elements).then(function(elements) {
                  scope.entity.type.elements = elements;
                });
              }
            });
          }
        });
      }


      /**
       * @name formatNamespaceType
       *
       * @description transform the Namespace type returned into readable text
       *
       * @param text - String representing the type of Namespace
       *
       * @returns {string}
       */
      function formatNamespaceType(namespaceType) {
        var mapping = {
          'domain': 'Domain',
          'otherNamespace': 'Other',
          'externalStandard': 'External Standard'
        };

        return mapping[namespaceType];
      }


      /**
       * @name goBack
       *
       * @description Navigates back to the search results page with previous search params
       */
      scope.goBack = function () {
        $window.history.back();
      };

      init();
    }
  }
})();
