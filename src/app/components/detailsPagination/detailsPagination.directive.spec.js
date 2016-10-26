'use strict';

describe('directive:detailsPagination', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, $location;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {

    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');

    element = angular.element('<details-pagination show-action="showData"></details-pagination>');
    scope.showData = function(pageInfo) {return true;}
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.isolateScope();

  }));


  it('should go to next page', function () {
    elScope.totalPages = 10;
    elScope.currentPage = 10;
    elScope.nextPage();
    expect(elScope.currentPage).toEqual(10); // cannot go to next because max page
    elScope.currentPage = 4;
    elScope.nextPage();
    expect(elScope.currentPage).toEqual(5);
  });


  it('should go to previous page', function () {
    elScope.totalPages = 10;
    elScope.currentPage = 1;
    elScope.prevPage();
    expect(elScope.currentPage).toEqual(1); // cannot go to prev because first page
    elScope.currentPage = 4;
    elScope.prevPage();
    expect(elScope.currentPage).toEqual(3);
  });


});