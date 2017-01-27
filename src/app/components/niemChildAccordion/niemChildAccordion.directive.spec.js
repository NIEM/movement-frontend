'use strict';

describe('directive:niemChildAccordion', function () {

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

    element = angular.element('<niem-child-accordion click-handler="clickHandler" element-data="elementData"></niem-child-accordion>');
    scope.clickHandler = function(data) {return true;};
    scope.elementData = {type: 'CardType'};
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.isolateScope();

  }));


  it('should show more', function () {
    elScope.seeMore = false;
    elScope.showMore();
    expect(elScope.seeMore).toBe(true);
  });

  it('should open and handle click on click', function () {
    elScope.isOpen = false;
    elScope.treeLevel = 2;
    elScope.onClick();
    expect(elScope.isOpen).toBe(true);
    expect(elScope.nextLevel).toBe(3);
    expect(elScope.dataFound).toBe(true);
    elScope.onClick();
    expect(elScope.dataFound).toBe(true);
  });


});
