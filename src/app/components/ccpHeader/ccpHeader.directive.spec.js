'use strict';

describe('Directive: ccpHeader', function () {

  // load the directive's module and view
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
  }));

  // compile the element to be tested
  it('should be a thing', inject(function ($compile) {
    element = angular.element('<ccp-header></ccp-header>');
    element = $compile(element)(scope);

    scope.$apply();
  }));
});