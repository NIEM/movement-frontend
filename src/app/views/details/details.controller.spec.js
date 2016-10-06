'use strict';

describe('Controller: DetailsCtrl', function() {

  // load the controller's module
  beforeEach(module('dhsniem'));

  var DetailsCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    DetailsCtrl = $injector.get('$controller')('DetailsCtrl');
  }));
});
