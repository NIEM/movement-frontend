'use strict';

/**
 * @ngdoc directive
 *
 * @name subsetRemoveFromSubsetButton
 *
 * @description
 * My Subset button in the header
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
        mySubsetArray: '='
      },
      link: link
    };

    /**
     *  Defines variables and functions within subsetRemoveFromSubsetButton scope
     */
    function link(scope) {

      /**
       * @name removeFromSubset
       *
       * @description Removes the scope entityId from My Subset
       */
      scope.removeFromSubset = function removeFromSubset() {
        mySubset.removeFromSubset(scope.entityId);

        scope.$emit('updatedMySubsetArray',
          scope.mySubsetArray.filter(function(subsetElement) {
            return subsetElement.id !== scope.entityId;
          })
        );
      };
    }
  }
})();
