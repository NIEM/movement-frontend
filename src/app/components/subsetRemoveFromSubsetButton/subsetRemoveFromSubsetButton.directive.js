'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name subsetRemoveFromSubsetButton
 * @param {service} mySubset Handles getting and setting value in the subset generator
 * @description The remove from subset button
 * @attr entityId The Id of the entity to remove from the subset
 * @attr mySubsetIdArray An array of the Ids in the subset
 * @example
 *  Usage:
 *  <subset-remove-from-subset-button entity-id="nc:Person" my-subset-id-array=["nc:Card"]></subset-remove-from-subset-button>
 */
(function () {

  angular
    .module('dhsniem')
    .directive('subsetRemoveFromSubsetButton', subsetRemoveFromSubsetButton);

  function subsetRemoveFromSubsetButton(mySubset) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/subsetRemoveFromSubsetButton/subsetRemoveFromSubsetButton.directive.html',
      scope: {
        entityId: '=',
        mySubsetIdArray: '='
      },
      link: link
    };

    /**
     *  Defines variables and functions within subsetRemoveFromSubsetButton scope
     */
    function link(scope) {

      /**
       * @memberof subsetRemoveFromSubsetButton
       * @description Removes the scope entityId from My Subset
       */
      scope.removeFromSubset = function removeFromSubset() {
        mySubset.removeFromSubset(scope.entityId);

        scope.$emit('updatedMySubsetArray',
          scope.mySubsetIdArray.filter(function(subsetElement) {
            return subsetElement !== scope.entityId;
          })
        );
      };
    }
  }
})();
