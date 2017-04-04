'use strict';

describe('directive:subsetAddRemoveFromSubsetButton', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, mySubset;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    mySubset = $injector.get('mySubset');

    element = angular.element('<subset-remove-from-subset-button></subset-remove-from-subset-button>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.isolateScope();
  }));

  it('should remove from subset', inject(function () {
    spyOn(mySubset, 'removeFromSubset');
    elScope.removeFromSubset();
    expect(mySubset.removeFromSubset).toHaveBeenCalled();
  }));

});
