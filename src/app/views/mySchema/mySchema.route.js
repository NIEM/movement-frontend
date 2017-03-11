'use strict';

(function () {

  angular
    .module('dhsniem')
    .config(function ($stateProvider) {
      $stateProvider
        .state('main.mySchema', {
          url         : '/mySchema',
          templateUrl : 'app/views/mySchema/mySchema.view.html',
          controller  : 'MySchemaCtrl',
          controllerAs: 'MySchemaCtrl'
        });
    });

}());
