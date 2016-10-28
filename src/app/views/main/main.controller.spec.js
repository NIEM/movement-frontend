'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var MainCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    MainCtrl = $injector.get('$controller')('MainCtrl');
  }));

  it('should be a thing', function () {
    expect(MainCtrl).toBeDefined();
  });


});
