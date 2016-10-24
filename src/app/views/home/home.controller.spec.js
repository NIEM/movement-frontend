'use strict';

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));

  var HomeCtrl;
  var $document;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    HomeCtrl = $injector.get('$controller')('HomeCtrl');
  }));

  it('should display the homepage title', function () {
    expect(window.document.title).toBe('CCP - Data Information Exchange Tool');
  });


});