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

  function HomeCtrl($location) {

    var vm = this;

    vm.params = $location.search();

  }

})();
