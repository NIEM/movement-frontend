'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name solrDetails
 * @param {service} $location The $location service parses the URL in the browser address bar (based on the window.location) and makes the URL available to your application
 * @param {service} $rootScope The root scope of the application
 * @param {service} $window A reference to the browser's window object
 * @param {service} $state Handles the application's current state via ui-router
 * @param {service} niemTree A service to handle requests for the element tree
 * @description All of the details and tree for an element
 * @example
 *  Usage:
 *  <solr-details></solr-details>
 */
(function () {

  angular
    .module('dhsniem')
    .directive('solrDetails', solrDetails);

  function solrDetails(niemTree, $location, $window, $state, $rootScope) {
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
       * @private
       * @description Initializes controller, retrieves the type and child elements for the scope entity
       */
      function init() {
        scope.entityID = $location.search().entityID;
        $window.document.title = scope.entityID + ' Details - NIEM Movement';

        niemTree.getDocById(scope.entityID).then(function (entityDoc) {
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
          } else {
            niemTree.getSubstitutionGroups(scope.entityID).then(function(subGroups) {
              scope.entity.subGroups = subGroups;
            })
          }
        });
      }


      /**
       * @private
       * @param {String} namespaceType String representing the type of Namespace
       * @returns {String} The formatted namespace type
       * @description Transforms the namespaceType returned into properly formatted text
       */
      function formatNamespaceType(namespaceType) {
        return {
          'domain': 'Domain',
          'externalStandard': 'External Standard'
        }[namespaceType];
      }


      /**
       * @memberof solrDetails
       * @description Navigates back to the search results page with previous search params
       */
      scope.goBack = function () {
        $state.go('main.results', $rootScope.lastSearch);
      };

      init();
    }
  }
})();
