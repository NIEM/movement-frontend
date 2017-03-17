'use strict';

describe('directive:schemaAddRemoveBtnGroup', function () {

  // load the directive's module and view
  beforeEach(angular.mock.module('dhsniem'));
  beforeEach(angular.mock.module('templates'));

  var element, scope;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
  }));

  // compile the element to be tested
  it('should be a thing', inject(function ($compile) {
    element = angular.element('<schema-add-remove-btn-group></schema-add-remove-btn-group>');
    element = $compile(element)(scope);

    scope.$apply();
  }));
});
