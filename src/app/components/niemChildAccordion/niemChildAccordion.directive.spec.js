'use strict';

describe('directive:niemChildAccordion', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, $httpBackend, niemTree;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {

    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    niemTree = $injector.get('niemTree');

    $httpBackend.whenGET(new RegExp('\\' + 'uib/template')).respond(200, {});

    element = angular.element('<niem-child-accordion element-data="elementData"></niem-child-accordion>');
    scope.elementData = {type: {elements: ['nc:Date']}};
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.isolateScope();

  }));

  it('should open and handle click on click', function () {
    spyOn(niemTree, 'getElementObjects').and.callThrough();
    elScope.isOpen = false;
    elScope.dataFound = false;
    elScope.expandElement();
    expect(elScope.isOpen).toBe(true);
    expect(niemTree.getElementObjects).toHaveBeenCalled();
    expect(elScope.dataFound).toBe(true);
    elScope.expandElement();
    expect(elScope.dataFound).toBe(true);
    elScope.expandElement();
  });

});
