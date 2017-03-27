'use strict';

describe('directive:schemaAddRemoveFromSchemaButton', function () {

  // load the directive's module and view
  beforeEach(angular.mock.module('dhsniem'));
  beforeEach(angular.mock.module('templates'));

  var element, scope, $compile, elScope, mySchema;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    mySchema = $injector.get('mySchema');

    element = angular.element('<schema-add-remove-from-schema-button></schema-add-remove-from-schema-button>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.isolateScope();
  }));

  it('should toggle between add and remoe', inject(function () {
    spyOn(mySchema, 'removeFromSchema');
    spyOn(mySchema, 'addToSchema');
    // expect(mySchema.removeFromSchema).toHaveBeenCalled();
    elScope.isInMySchema = false;
    elScope.toggleSchemaAddRemove();
    expect(elScope.isInMySchema).toEqual(true);
    expect(elScope.schemaAddRemoveButton).toEqual('Remove from Schema');
    expect(mySchema.addToSchema).toHaveBeenCalled();
    elScope.toggleSchemaAddRemove();
    expect(elScope.isInMySchema).toEqual(false);
    expect(elScope.schemaAddRemoveButton).toEqual('Add to Schema');
    expect(mySchema.removeFromSchema).toHaveBeenCalled();
  }));
});
