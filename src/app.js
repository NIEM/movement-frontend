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
  .constant('SOLR_URL', 'http://localhost:8983/solr/niem-test-xsd/select')
  .config(function($urlRouterProvider) {
    $urlRouterProvider.when('', '/'); // redirect to root if the state is ''

    $urlRouterProvider.otherwise('/'); // redirect to root if state is not found
  });
