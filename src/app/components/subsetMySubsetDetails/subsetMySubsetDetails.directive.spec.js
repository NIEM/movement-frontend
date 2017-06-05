'use strict';

describe('directive:subsetMySubsetDetails', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, SOLR_URL, $httpBackend, $window, mySubset, NODE_URL, niemTree;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    $window = $injector.get('$window');
    SOLR_URL = $injector.get('SOLR_URL');
    NODE_URL = $injector.get('NODE_URL');
    mySubset = $injector.get('mySubset');
    niemTree = $injector.get('niemTree');

    $httpBackend.whenJSONP(new RegExp('\\' + SOLR_URL)).respond(200, {});

    element = angular.element('<subset-my-subset-details></subset-my-subset-details>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.scope();
  }));

  it('should transform namespace text', function () {
    expect(elScope.formatNamespaceType('domain')).toBe('Domain');
  });

  it('should download json schema', function () {
    spyOn($window, 'open').and.callFake(function() {
      return true;
    });
    elScope.mySubsetIDs = ['nc:Date', 'nc:MapName'];
    elScope.downloadSchema();
    expect(elScope.url).toEqual(NODE_URL + 'itemsToExport[]=nc:Date&itemsToExport[]=nc:MapName');
    expect($window.open).toHaveBeenCalled();
    expect($window.open).toHaveBeenCalledWith(elScope.url, '_parent');
  });

  it('should remove all from subset', function () {
    spyOn(mySubset, 'removeAllFromSubset').and.callThrough();
    elScope.mySubsetIDs = ['nc:Date', 'nc:MapName'];
    elScope.mySubsetArray = [{'id': 'nc:Date'}, {'id': 'nc:MapName'}];
    elScope.removeSubset();
    expect(mySubset.removeAllFromSubset).toHaveBeenCalled();
    expect(elScope.mySubsetIDs).toEqual([]);
    expect(elScope.mySubsetArray).toEqual([]);
  });

  it('should remove an item from the subset', function () {
    spyOn(mySubset, 'getSubset').and.callThrough();
    elScope.mySubsetIDs = ['nc:Date', 'nc:MapName'];
    elScope.mySubsetArray = [{'id': 'nc:Date'}, {'id': 'nc:MapName'}];
    elScope.removeFromSubset('nc:MapName');
    expect(elScope.mySubsetArray).toEqual([{'id': 'nc:Date'}]);
    elScope.removeFromSubset('nc:Date');
    expect(elScope.mySubsetArray).toEqual([]);
    expect(mySubset.getSubset).toHaveBeenCalled();
    expect(elScope.mySubsetIDs).toEqual([]);
  });

});
