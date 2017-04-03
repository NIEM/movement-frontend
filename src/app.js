'use strict';

/**
 * @module dhsniem
 *
 * @description
 * Main module of the application.
 */
angular
  .module('dhsniem', [
    'ui.router',
    'ui.bootstrap',
    'ngAria'
  ])
  .config(function ($urlRouterProvider) {
    $urlRouterProvider.when('', '/'); // redirect to root if the state is ''
    $urlRouterProvider.otherwise('/'); // redirect to root if state is not found
  })

  .run(function ($rootScope, $window, $location) {
    $window.ga('create', 'UA-96555344-1', 'auto');
    $rootScope.$on('$stateChangeSuccess', function () {
      $window.scroll(0, 0);
      $window.ga('send', 'pageview', $location.url());
    });
  });

