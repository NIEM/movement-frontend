'use strict';

describe('Controller: DetailsCtrl', function() {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var DetailsCtrl, $location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    $location = $injector.get('$location');
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

});
