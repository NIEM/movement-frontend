'use strict';

describe('directive:solrMySchemaDetails', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, SOLR_URL, $httpBackend, $window, mySchema, NODE_URL, niemTree;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');
    $window = $injector.get('$window');
    SOLR_URL = $injector.get('SOLR_URL');
    NODE_URL = $injector.get('NODE_URL');
    mySchema = $injector.get('mySchema');
    niemTree = $injector.get('niemTree');

    $httpBackend.whenJSONP(new RegExp('\\' + SOLR_URL)).respond(200, {});

    element = angular.element('<solr-my-schema-details></solr-my-schema-details>');
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
    elScope.mySchemaIDs = ['nc:Card', 'nc:Person'];
    elScope.downloadSchema();
    expect(elScope.url).toEqual(NODE_URL + 'itemsToExport[]=nc:Card&itemsToExport[]=nc:Person');
    expect($window.open).toHaveBeenCalled();
    expect($window.open).toHaveBeenCalledWith(elScope.url, '_parent');
  });

  it('should remove all from schema', function () {
    spyOn(mySchema, 'removeAllFromSchema').and.callThrough();
    elScope.mySchemaIDs = ['nc:Card', 'nc:Person'];
    elScope.mySchemaArray = [{'id': 'nc:Card'}, {'id': 'nc:Person'}];
    elScope.removeSchema();
    expect(mySchema.removeAllFromSchema).toHaveBeenCalled();
    expect(elScope.mySchemaIDs).toEqual([]);
    expect(elScope.mySchemaArray).toEqual([]);
  });

  it('should remove an item from the schema', function () {
    spyOn(mySchema, 'getSchema').and.callThrough();
    elScope.mySchemaIDs = ['nc:Card', 'nc:Person'];
    elScope.mySchemaArray = [{'id': 'nc:Card'}, {'id': 'nc:Person'}];
    elScope.removeFromSchema('nc:Person');
    expect(elScope.mySchemaArray).toEqual([{'id': 'nc:Card'}]);
    elScope.removeFromSchema('nc:Card');
    expect(elScope.mySchemaArray).toEqual([]);
    expect(mySchema.getSchema).toHaveBeenCalled();
    expect(elScope.mySchemaIDs).toEqual([]);
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
