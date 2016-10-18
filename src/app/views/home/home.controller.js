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

  function HomeCtrl($window) {
    $window.document.title = 'CCP - Data Information Exchange Tool';
  }

})();
