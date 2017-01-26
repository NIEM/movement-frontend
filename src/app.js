'use strict';

/**
 * @module dhsniem
 *
 * @description
 * Main module of the application.
 */
angular
  .module('dhsniem', [
    'ngAnimate',
    'ngCookies',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .constant('SOLR_URL', 'http://35.164.75.93:8983/solr/dhsniem/select')
  .config(function($urlRouterProvider) {
    $urlRouterProvider.when('', '/'); // redirect to root if the state is ''

    $urlRouterProvider.otherwise('/'); // redirect to root if state is not found
  });
