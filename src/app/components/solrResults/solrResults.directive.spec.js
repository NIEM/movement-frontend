'use strict';

describe('directive:solrResults', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, solrSearch, $compile, $location, $httpBackend, SOLR_URL, $rootScope;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {

    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');

    solrSearch = $injector.get('solrSearch');
    SOLR_URL = $injector.get('SOLR_URL');

    $httpBackend.whenJSONP(new RegExp('\\' + SOLR_URL)).respond(200, {});
    $httpBackend.whenGET(new RegExp('\\' + 'uib/template')).respond(200, {});

    element = angular.element('<solr-results></solr-results>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.scope();

  }));


  it('should clear all filters', function () {
    $location.search('selectedFacets', 'domain:"Core"');
    var selectedFacets = solrSearch.getSelectedFacets();
    elScope.clearAllFilters();
    selectedFacets = solrSearch.getSelectedFacets();
    expect(selectedFacets.length).toEqual(0);
  });
  
  it('should close a popover', function () {
    var corePopover = elScope.popovers.core.popoverIsOpen;
    elScope.popovers.core.popoverIsOpen = true;
    elScope.closePopover('core');
    expect(corePopover).toEqual(false);
  });

  it('should be first of namespace', function () {
    elScope.sort = '';
    var isFirst = elScope.isFirstOfNamespace('Core',{namespace:'Emergency Management', namespaceType:'domain'});
    expect(isFirst).toEqual(false); // for when sort is not applied
    elScope.sort = 'namespacePriority asc';
    isFirst = elScope.isFirstOfNamespace('Core',{namespace:'Core', namespaceType:'domain'});
    expect(isFirst).toEqual(false); // for when namespaces are the same
    isFirst = elScope.isFirstOfNamespace('Core',{namespace:'Emergency Management', namespaceType:'domain'});
    expect(isFirst).toEqual(true);
  });

  it('should be first of alphabet', function () {
    elScope.sort = '';
    var isFirst = elScope.isFirstOfAlphabet('Alert', 'Card', 1);
    expect(isFirst).toEqual(false); // for when sort is not applied
    elScope.sort = 'name asc';
    isFirst = elScope.isFirstOfAlphabet(undefined, 'Alert', 0);
    expect(isFirst).toEqual(true); // for when it is the first document
    isFirst = elScope.isFirstOfAlphabet('Alert', 'AlertCard', 1);
    expect(isFirst).toEqual(false); // for when names are the same
    isFirst = elScope.isFirstOfAlphabet('Alert', 'Card', 1);
    expect(isFirst).toEqual(true);
  });

  it('should update on a new search', function () {
    spyOn(solrSearch, 'getSort');
    $rootScope.$emit('newSearch');
    expect(solrSearch.getSort).toHaveBeenCalled();
  });

});
