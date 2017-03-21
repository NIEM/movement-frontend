'use strict';

describe('directive:solrSearchInput', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, $location, $httpBackend, $rootScope, $state, solrRequest, solrSearch, SOLR_URL;

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
    SOLR_URL = $injector.get('SOLR_URL');

    $httpBackend.whenJSONP(new RegExp('\\' + SOLR_URL)).respond(200, {});
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
    expect($state.go).toHaveBeenCalledWith('main.results', {q:'*', selectedFacets:undefined});
  });

  it('should search a specific text', function () {
    spyOn($state, 'go');
    elScope.searchQuery = 'Card';
    elScope.search();
    expect($rootScope.query).toEqual('Card');
    expect($state.go).toHaveBeenCalledWith('main.results', {q:'Card', selectedFacets:undefined});
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
    expect($state.go).toHaveBeenCalledWith('main.results', {q:'Card', selectedFacets:undefined});
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

  it('should bump NIEM Core to top of filter list', function () {
    var coreSort = elScope.sortByName('Core');
    var otherSort = elScope.sortByName('Emergency Management');
    expect(coreSort).toBe(-1);
    expect(otherSort).toBe('Emergency Management');
  });

  it('should set domain name in search dropdown', function () {
    elScope.domainSelect('Emergency Management');
    expect(elScope.selectedDomain).toEqual('Emergency Management');
  });

  it('should set the domain names in dropdown if they exist', function () {
    $rootScope.rootDomain = ['Core', 'Emergency Management'];
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.isolateScope();
    expect(elScope.domainNames).toEqual(['Core', 'Emergency Management']);
  });

});
