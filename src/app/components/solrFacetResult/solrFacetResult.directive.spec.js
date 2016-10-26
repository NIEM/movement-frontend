'use strict';

describe('directive:solrFacetResult', function () {

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

    element = angular.element('<solr-facet-result></solr-facet-result>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.isolateScope();

  }));


  it('should generate facet string', function () {
    elScope.field = 'domain';
    elScope.key = 'Core';
    expect(elScope.facetString()).toBe('domain:"Core"');
  });

  it('should determine if facet is selected', function () {
    elScope.field = 'domain';
    elScope.key = 'Core';
    expect(elScope.isSelected()).toBe(false);
    $location.search('selectedFacets', 'domain:"Core"');
    expect(elScope.isSelected()).toBe(true);
  });

  it('should remove facet', function () {
    elScope.field = 'domain';
    elScope.key = 'Core';
    $location.search('selectedFacets', 'domain:"Core"');
    elScope.addRemoveFacet();
    expect($location.search().selectedFacets.length).toBe(0);
  });

  it('should add facet', function () {
    elScope.field = 'domain';
    elScope.key = 'Core';
    elScope.addRemoveFacet();
    expect($location.search().selectedFacets.length).toBe(1);
  });

});
