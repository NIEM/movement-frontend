'use strict';

describe('Directive: niemFooter', function () {

  // load the directive's module and view
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, $compile;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
  }));

  // compile the element to be tested
  it('should be a thing', inject(function () {
    element = angular.element('<niem-footer></niem-footer>');
    element = $compile(element)(scope);
    scope.$apply();
  }));
});