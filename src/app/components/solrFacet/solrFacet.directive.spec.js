'use strict';

describe('directive:solrFacet', function () {

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

    element = angular.element('<solr-facet></solr-facet>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.isolateScope();

  }));


  it('should bump NIEM Core to top of filter list', function () {
    var coreSort = elScope.sortByName('Core');
    var otherSort = elScope.sortByName('Emergency Management');
    expect(coreSort).toBe(-1);
    expect(otherSort).toBe(otherSort);
  });

  it('should provide tooltip text', function () {
    elScope.getTooltipText('Entities');
    expect(elScope.tooltipText['Entities']).toBe('A physical thing, document, abstract concept, number, or string');
  });


  it('should close popover', function () {
    elScope.popoverIsOpen = true;
    elScope.closePopover();
  });


});
