'use strict';

/**
 * @ngdoc controller
 * @memberof dhsniem
 * @name AppCtrl
 * @description The main application Controller for dhsniem
 */
(function() {

  angular
    .module('dhsniem')
    .controller('AppCtrl', AppCtrl);

  function AppCtrl() {
    var vm = this;
    vm.title = 'DHS NIEM'; // Default Title
  }

})();
