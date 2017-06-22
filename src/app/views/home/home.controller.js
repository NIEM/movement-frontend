'use strict';

/**
 * @ngdoc controller
 * @memberof dhsniem
 * @name HomeCtrl
 * @description Controller for the landing page
 */
(function() {

  angular
    .module('dhsniem')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($window, $rootScope) {
    $window.document.title = 'NIEM Movement';
    $rootScope.lastSearch = null;
  }

})();
