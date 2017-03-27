'use strict';

describe('directive:solrFacet', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, $location, $httpBackend, $rootScope, solrSearch;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {

    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    solrSearch = $injector.get('solrSearch');

    $httpBackend.whenGET(new RegExp('\\' + 'uib/template')).respond(200, {});

    element = angular.element('<solr-facet></solr-facet>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.isolateScope();

  }));


  it('should bump NIEM Core to top of filter list', function () {
    var coreSort = elScope.sortByName('Core');
    var otherSort = elScope.sortByName('Emergency Management');
    expect(coreSort).toBe(-1);
    expect(otherSort).toBe('Emergency Management');
  });

  it('should provide tooltip text', function () {
    elScope.getTooltipText('Domain');
    expect(elScope.tooltipText['Domain']).toBe('Communities of interest (COI) that are formally established, with an executive steward, to officially manage and govern a portion of the NIEM data model');
  });


  it('should close popover', function () {
    elScope.popoverIsOpen = true;
    elScope.closePopover();
  });

  it('should update on a new search', function () {
    spyOn(solrSearch, 'getFacet');
    $rootScope.$emit('newSearch');
    expect(solrSearch.getFacet).toHaveBeenCalled();
  });

});
