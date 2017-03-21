'use strict';

describe('directive:schemaRemoveFromSchemaButton', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, mySchema;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    mySchema = $injector.get('mySchema');

    element = angular.element('<schema-remove-from-schema-button></schema-remove-from-schema-button>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.isolateScope();
  }));

  it('should remove from schema', inject(function () {
    spyOn(mySchema, 'removeFromSchema');
    elScope.removeFromSchema();
    expect(mySchema.removeFromSchema).toHaveBeenCalled();
  }));

});
