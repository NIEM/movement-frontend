'use strict';

/**
 * @ngdoc directive
 *
 * @name subsetAddRemoveFromSubsetButton
 *
 * @description
 * directive for dhsniem
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

      scope.isInMySubset = mySubset.getSubset().indexOf(scope.entityId) > -1;
      toggleSubsetButtonText();


      /**
       * @name toggleSubsetAddRemove
       *
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
       * @name toggleSubsetButtonText
       *
       * @description Toggles button text based on if an item exists in my subset
       */
      function toggleSubsetButtonText() {
        scope.subsetAddRemoveButton = scope.isInMySubset ? 'Remove from Subset' : 'Add to Subset';
      }

    }
  }

})();


