'use strict';

describe('directive:schemaAddToSchemaButton', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');

    element = angular.element('<schema-add-to-schema-button></schema-add-to-schema-button>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.scope();
  }));


});
