'use strict';

describe('directive:niemAccordion', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, $httpBackend;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {

    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.whenGET(new RegExp('\\' + 'uib/template')).respond(200, {});

    element = angular.element('<niem-accordion click-handler="clickHandler" data="data" is-properties="isProperties"></niem-accordion>');
    
    scope.clickHandler = function(data) {return true;};
    scope.data = [{type: {name: 'CardType', elements: ['el1', 'el2']}}];
    scope.isProperties = true;

    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.isolateScope();

  }));


  it('should toggle accordion', function () {
    elScope.isOpen = false;
    elScope.toggleAccordion();
    expect(elScope.isOpen).toBe(true);
    expect(elScope.dataFound).toBe(true);

    elScope.isProperties = false;
    elScope.data = [{elements: 'CardType'}];
    elScope.toggleAccordion();

  });

});
