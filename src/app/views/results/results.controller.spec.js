'use strict';

describe('Controller: ResultsCtrl', function() {

  // load the controller's module
  beforeEach(module('dhsniem'));

  var ResultsCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    ResultsCtrl = $injector.get('$controller')('ResultsCtrl');
  }));
});
