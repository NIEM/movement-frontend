'use strict';

/**
 * @ngdoc directive
 *
 * @name subsetMySubsetButton
 *
 * @description
 * My Subset button in the header
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
      scope.subsetCount = mySubset.getSubsetCount();

      scope.$watch(function() {
        return mySubset.getSubsetCount();
      }, function(updatedSubsetCount){
        scope.subsetCount = updatedSubsetCount;
      });

    }
  }
})();
