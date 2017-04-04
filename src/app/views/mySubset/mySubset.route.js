'use strict';

(function () {

  angular
    .module('dhsniem')
    .config(function ($stateProvider) {
      $stateProvider
        .state('main.mySubset', {
          url         : '/mySubset',
          templateUrl : 'app/views/mySubset/mySubset.view.html'
        });
    });

}());
