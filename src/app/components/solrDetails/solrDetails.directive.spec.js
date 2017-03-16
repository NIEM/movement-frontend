'use strict';

describe('Controller: DetailsCtrl', function() {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var DetailsCtrl, solrRequest, $location, $window;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    solrRequest = $injector.get('solrRequest');
    $location.search('entityID', 'Core:Alert');
    DetailsCtrl = $injector.get('$controller')('DetailsCtrl');

  }));

  it('should close popover', function () {
    DetailsCtrl.popovers['simple-content-type'].popoverIsOpen = true;
    DetailsCtrl.closePopover('simple-content-type');
    expect(DetailsCtrl.popovers['simple-content-type'].popoverIsOpen).toBe(false);
  });

  it('should transform namespace text', function () {
    expect(DetailsCtrl.transformNamespaceText('domain')).toBe('Domain');
  });

  it('should go back to search results', function () {
    spyOn($window.history, 'back');
    DetailsCtrl.goBack();
    expect($window.history.back).toHaveBeenCalled();
  });

  it('should get element objects', function () {
    var typeDoc = {elements: ['Card']};
    spyOn(solrRequest, 'makeSolrRequest').and.callThrough();
    DetailsCtrl.getElementObjects(typeDoc);
    expect(solrRequest.makeSolrRequest).toHaveBeenCalled();
  });

});
