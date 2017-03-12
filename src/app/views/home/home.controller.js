'use strict';

/**
 * @ngdoc controller
 *
 * @name HomeCtrl
 *
 * @description
 * Controller for dhsniem
 */
(function() {

  angular
    .module('dhsniem')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($window, $rootScope) {
    $window.document.title = 'Open Source Tool';
    $rootScope.query = null;
  }

})();
