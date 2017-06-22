'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name subsetAddRemoveFromSubsetButton
 * @param {service} mySubset Handles getting and setting value in the subset generator
 * @description Add and remove from subset button
 * @attr entityId The Id of the entity to add or remove
 * @example
 *  Usage:
 *  <subset-add-remove-from-subset-button entity-id="nc:Person"></subset-add-remove-from-subset-button>
 */
(function () {

  angular
    .module('dhsniem')
    .directive('subsetAddRemoveFromSubsetButton', subsetAddRemoveFromSubsetButton);

  function subsetAddRemoveFromSubsetButton(mySubset) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/subsetAddRemoveFromSubsetButton/subsetAddRemoveFromSubsetButton.directive.html',
      scope: {
        entityId: '='
      },
      link: link
    };

    /**
     *  Defines variables and functions within subsetAddRemoveFromSubsetButton scope
     */
    function link(scope) {
      /**
       * @memberof subsetAddRemoveFromSubsetButton
       * @property isInMySubset
       * @type {boolean}
       * @description Whether or not the current entity is in the subset
       */
      scope.isInMySubset = mySubset.getSubset().indexOf(scope.entityId) > -1;
      toggleSubsetButtonText();


      /**
       * @memberof subsetAddRemoveFromSubsetButton
       * @description Toggles the isInMySubset scope variable to show/hide the add/remove buttons
       */
      scope.toggleSubsetAddRemove = function () {
        scope.isInMySubset = !scope.isInMySubset;
        toggleSubsetButtonText();
        if (scope.isInMySubset) {
          mySubset.addToSubset(scope.entityId);
        } else {
          mySubset.removeFromSubset(scope.entityId);
        }
      };


      /**
       * @private
       * @description Toggles button text based on if an item exists in my subset
       */
      function toggleSubsetButtonText() {
        scope.subsetAddRemoveButton = scope.isInMySubset ? 'Remove from Subset' : 'Add to Subset';
      }

    }
  }

})();


