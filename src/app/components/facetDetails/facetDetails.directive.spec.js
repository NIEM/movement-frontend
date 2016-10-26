'use strict';

describe('directive:facetDetails', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, $location, $httpBackend;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {

    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.whenGET(new RegExp('\\' + 'uib/template')).respond(200, {});

    element = angular.element('<facet-details></facet-details>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.isolateScope();

  }));


  it('should close popover', function () {
    elScope.popoverIsOpen = true;
    elScope.closePopover();
    expect(elScope.popoverIsOpen).toBe(false);
  });


});
