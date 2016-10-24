'use strict';

describe('directive:solrResults', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, solrSearch, $compile, $location, $httpBackend, SOLR_URL;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {

    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');

    solrSearch = $injector.get('solrSearch');
    SOLR_URL = $injector.get('SOLR_URL');

    $httpBackend.whenJSONP(new RegExp('\\' + SOLR_URL)).respond(200, {});
    $httpBackend.whenGET(new RegExp('\\' + 'uib/template')).respond(200, {});

  }));


  it('should clear all filters', function () {

    element = angular.element('<solr-results></solr-results>');
    element = $compile(element)(scope);
    scope.$apply();

    var elScope = element.scope();

    $location.search('selectedFacets', 'domain:"Core"');
    var selectedFacets = solrSearch.getSelectedFacets();

    elScope.clearAllFilters();
    selectedFacets = solrSearch.getSelectedFacets();

    expect(selectedFacets.length).toEqual(0);

  });

});
