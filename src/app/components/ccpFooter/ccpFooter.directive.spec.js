'use strict';

describe('Directive: ccpFooter', function () {

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
    element = angular.element('<ccp-footer></ccp-footer>');
    element = $compile(element)(scope);

    scope.$apply();
  }));
});