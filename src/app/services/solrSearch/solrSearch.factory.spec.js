'use strict';

describe('Factory: solrSearch', function() {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var solrSearch, solrRequest, $location, $window, $httpBackend, SOLR_URL;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    $httpBackend = $injector.get('$httpBackend');
    solrRequest = $injector.get('solrRequest');
    solrSearch = $injector.get('solrSearch');
    SOLR_URL = $injector.get('SOLR_URL');

    $httpBackend.whenJSONP(new RegExp('\\' + SOLR_URL)).respond(200, {});

  }));

  it('should get the query', function () {
    expect(solrSearch.getQuery()).toBe('*');
    $location.search('q', 'Card');
    expect(solrSearch.getQuery()).toBe('Card');    
  });

  it('should get the sort', function () {
    expect(solrSearch.getSort()).toBe('score desc');
    $location.search('sortBy', 'name asc');
    expect(solrSearch.getSort()).toBe('name asc');
  });

  it('should get the empty facet', function () {
    expect(solrSearch.getFacet('domain')).toEqual({});
  });

  it('should get the selected facets', function () {
    expect(solrSearch.getSelectedFacets().length).toBe(0);
    $location.search('selectedFacets', 'domain:"Core"');
    expect(solrSearch.getSelectedFacets().length).toBe(1);
  });

  it('should execute a search', function () {
    spyOn(solrRequest, 'makeSolrRequest').and.callThrough();
    $location.search('q', 'Card');
    solrSearch.search();
    expect(solrRequest.makeSolrRequest).toHaveBeenCalled();
    expect($window.document.title).toEqual = 'Card - CCP Search';
  });

  it('should clear all filters', function () {
    solrSearch.clearAllFilters();
    expect($location.search().selectedFacets.length).toBe(0);
    expect($location.search().page).toBe(1);
    solrSearch.clearAllFilters('domain:"Core"'); // for an exception
    expect($location.search().selectedFacets.length).toBe(1);
  });

});
