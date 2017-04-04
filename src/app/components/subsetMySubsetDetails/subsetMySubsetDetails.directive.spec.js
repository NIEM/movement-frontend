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
    elScope.mySubsetIDs = ['nc:Card', 'nc:Person'];
    elScope.downloadSchema();
    expect(elScope.url).toEqual(NODE_URL + 'itemsToExport[]=nc:Card&itemsToExport[]=nc:Person');
    expect($window.open).toHaveBeenCalled();
    expect($window.open).toHaveBeenCalledWith(elScope.url, '_parent');
  });

  it('should remove all from subset', function () {
    spyOn(mySubset, 'removeAllFromSubset').and.callThrough();
    elScope.mySubsetIDs = ['nc:Card', 'nc:Person'];
    elScope.mySubsetArray = [{'id': 'nc:Card'}, {'id': 'nc:Person'}];
    elScope.removeSubset();
    expect(mySubset.removeAllFromSubset).toHaveBeenCalled();
    expect(elScope.mySubsetIDs).toEqual([]);
    expect(elScope.mySubsetArray).toEqual([]);
  });

  it('should remove an item from the subset', function () {
    spyOn(mySubset, 'getSubset').and.callThrough();
    elScope.mySubsetIDs = ['nc:Card', 'nc:Person'];
    elScope.mySubsetArray = [{'id': 'nc:Card'}, {'id': 'nc:Person'}];
    elScope.removeFromSubset('nc:Person');
    expect(elScope.mySubsetArray).toEqual([{'id': 'nc:Card'}]);
    elScope.removeFromSubset('nc:Card');
    expect(elScope.mySubsetArray).toEqual([]);
    expect(mySubset.getSubset).toHaveBeenCalled();
    expect(elScope.mySubsetIDs).toEqual([]);
  });

  it('should expand tree and fetch data if not already found', function () {
    spyOn(niemTree, 'getElementObjects').and.callThrough();
    var entity = {'id': 'nc:Card', 'dataFound': false, 'expanded':false, 'type': {'elements': ['nc:CardSubElement']}};
    elScope.expandTree(entity);
    expect(niemTree.getElementObjects).toHaveBeenCalled();
    expect(entity.expanded).toEqual(true); //open
    entity.dataFound = true; // manually set
    elScope.expandTree(entity);
    expect(entity.expanded).toEqual(false); //closed
  });

});
