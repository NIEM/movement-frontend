'use strict';

describe('directive:solrSort', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, $location;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {

    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');

    element = angular.element('<solr-sort></solr-sort>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.scope();

  }));


  it('should sort by option', function () {
    elScope.sortOption = 'name asc';
    elScope.sortBy();
    expect($location.search().sortBy).toEqual('name asc');
  });

});
