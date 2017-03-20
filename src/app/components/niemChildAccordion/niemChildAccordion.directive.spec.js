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

    element = angular.element('<niem-child-accordion element-data="elementData"></niem-child-accordion>');
    scope.elementData = {type: 'CardType', elements: ["nc:ObligationCategoryText"]};
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.isolateScope();

  }));

  // it('should open and handle click on click', function () {
  //   elScope.isOpen = false;
  //   elScope.expandElement();
  //   expect(elScope.isOpen).toBe(true);
  //   expect(elScope.dataFound).toBe(true);
  //   elScope.expandElement();
  //   expect(elScope.dataFound).toBe(true);
  // });


});
