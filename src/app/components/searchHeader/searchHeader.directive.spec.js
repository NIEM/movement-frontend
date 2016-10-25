'use strict';

describe('Directive: searchHeader', function () {

  // load the directive's module and view
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, $compile, $httpBackend;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.whenGET(new RegExp('\\' + 'uib/template')).respond(200, {});

  }));

  // compile the element to be tested
  it('should be a thing', inject(function () {
    element = angular.element('<search-header></search-header>');
    element = $compile(element)(scope);
    scope.$apply();
  }));
});