'use strict';

describe('directive:schemaAddRemoveBtnGroup', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');

    element = angular.element('<schema-add-remove-btn-group></schema-add-remove-btn-group>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.scope();
  }));


});
