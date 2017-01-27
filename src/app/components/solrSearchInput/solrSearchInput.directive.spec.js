'use strict';

describe('directive:solrSearchInput', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, $location, $httpBackend, $rootScope, $state, solrRequest, solrSearch;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {

    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $state = $injector.get('$state');
    solrRequest = $injector.get('solrRequest');
    solrSearch = $injector.get('solrSearch');

    $httpBackend.whenGET(new RegExp('\\' + 'uib/template')).respond(200, {});

    element = angular.element('<solr-search-input></solr-search-input>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.isolateScope();

  }));


  it('should default search all results', function () {
    spyOn($state, 'go');
    elScope.search();
    expect($rootScope.query).toEqual('*');
    expect($state.go).toHaveBeenCalledWith('main.results', {q:'*', selectedFacets:''});
  });

  it('should search a specific text', function () {
    spyOn($state, 'go');
    elScope.searchQuery = 'Card';
    elScope.search();
    expect($rootScope.query).toEqual('Card');
    expect($state.go).toHaveBeenCalledWith('main.results', {q:'Card', selectedFacets:''});
  });

  it('should search for a specific domain from typeahead', function () {
    spyOn($state, 'go');
    elScope.search({'name': 'Card' + ' in NIEM Core', 'taNS': 'Core', 'query': 'Card', 'taNSType': 'domain'});
    expect($rootScope.query).toEqual('Card');
    expect($state.go).toHaveBeenCalledWith('main.results', {q:'Card', selectedFacets:'domain:"Core"'});
  });

  it('should search for all domains from typeahead', function () {
    spyOn($state, 'go');
    elScope.search({'name': 'Card' + ' in All Domains', 'taNS': 'all', 'query': 'Card'});
    expect($rootScope.query).toEqual('Card');
    expect($state.go).toHaveBeenCalledWith('main.results', {q:'Card', selectedFacets:''});
  });

  it('should get typeahead results', function () {
    spyOn(solrRequest, 'makeSolrRequest').and.callThrough();
    elScope.getTypeaheadResults('Card');
    expect(solrRequest.makeSolrRequest).toHaveBeenCalled();
  });


  it('should clear all filters if on search results page', function () {
    $state.go('main.results');
    $rootScope.$digest();
    spyOn(solrSearch, 'clearAllFilters');
    elScope.searchQuery = 'Card';
    elScope.search();
    expect(solrSearch.clearAllFilters).toHaveBeenCalled();
  });

});
