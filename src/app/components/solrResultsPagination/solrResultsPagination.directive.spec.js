'use strict';

describe('directive:solrResultsPagination', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, $location, $rootScope;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {

    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');
    $rootScope = $injector.get('$rootScope');

    element = angular.element('<solr-results-pagination></solr-results-pagination>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.scope();

  }));


  it('should go to next page', function () {
    elScope.totalPages = 10;
    elScope.currentPage = 10;
    elScope.nextPage();
    expect(elScope.currentPage).toEqual(10); // cannot go to next because max page
    elScope.currentPage = 4;
    elScope.nextPage();
    expect(elScope.currentPage).toEqual(5);
    expect($location.search().page).toEqual(5);
  });


  it('should go to previous page', function () {
    elScope.totalPages = 10;
    elScope.currentPage = 1;
    elScope.prevPage();
    expect(elScope.currentPage).toEqual(1); // cannot go to prev because first page
    elScope.currentPage = 4;
    elScope.prevPage();
    expect(elScope.currentPage).toEqual(3);
    expect($location.search().page).toEqual(3);
  });


  it('should update on a new search', function () {
    $rootScope.$emit('newSearch');
    expect(elScope.currentPage).toEqual(1);
    $location.search('page', 5);
    $rootScope.$emit('newSearch');
    expect(elScope.currentPage).toEqual(5);
  });


});
