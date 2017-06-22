'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name subsetMySubsetButton
 * @param {service} mySubset Handles getting and setting value in the subset generator
 * @description My Subset button in the header
 * @example
 *  Usage:
 *  <subset-my-subset-button></subset-my-subset-button>
 */
(function() {

  angular
    .module('dhsniem')
    .directive('subsetMySubsetButton', subsetMySubsetButton);

  function subsetMySubsetButton(mySubset) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/subsetMySubsetButton/subsetMySubsetButton.directive.html',
      link: link
    };


    /**
     *  Defines variables and functions within header scope
     *
     */
    function link(scope) {
      /**
       * @memberof subsetMySubsetButton
       * @property subsetCount
       * @type {Number}
       * @description The current number of items in the subset
       */
      scope.subsetCount = mySubset.getSubsetCount();

      scope.$watch(function() {
        return mySubset.getSubsetCount();
      }, function(updatedSubsetCount){
        scope.subsetCount = updatedSubsetCount;
      });

    }
  }
})();
