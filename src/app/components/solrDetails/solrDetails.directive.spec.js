'use strict';

describe('directive:solrDetails', function() {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, solrRequest, $location, $window;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    solrRequest = $injector.get('solrRequest');
    $location.search('entityID', 'Core:Alert');

    element = angular.element('<solr-my-schema-details></solr-my-schema-details>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.scope();
  }));

  it('should close popover', function () {
    elScope.popovers['simple-content-type'].popoverIsOpen = true;
    elScope.closePopover('simple-content-type');
    expect(elScope.popovers['simple-content-type'].popoverIsOpen).toBe(false);
  });

  it('should transform namespace text', function () {
    expect(elScope.transformNamespaceText('domain')).toBe('Domain');
  });

  it('should go back to search results', function () {
    spyOn($window.history, 'back');
    elScope.goBack();
    expect($window.history.back).toHaveBeenCalled();
  });

  it('should get element objects', function () {
    var typeDoc = {elements: ['Card']};
    spyOn(solrRequest, 'makeSolrRequest').and.callThrough();
    elScope.getElementObjects(typeDoc);
    expect(solrRequest.makeSolrRequest).toHaveBeenCalled();
  });

});
