'use strict';

describe('Directive: searchHeader', function () {

  // load the directive's module and view
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, $compile, $httpBackend, SOLR_URL;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    SOLR_URL = $injector.get('SOLR_URL');

    $httpBackend.whenGET(new RegExp('\\' + 'uib/template')).respond(200, {});
    $httpBackend.whenJSONP(new RegExp('\\' + SOLR_URL)).respond(200, {});

  }));

  // compile the element to be tested
  it('should be a thing', inject(function () {
    element = angular.element('<search-header></search-header>');
    element = $compile(element)(scope);
    scope.$apply();
  }));
});