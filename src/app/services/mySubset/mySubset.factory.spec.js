'use strict';

describe('factory:mySubset', function () {

  // load the factory's module
  beforeEach(angular.mock.module('dhsniem'));

  var mySubset;

  // initialize a new instance of the factory before each test
  beforeEach(inject(function ($injector) {
    mySubset = $injector.get('mySubset');
  }));

  it('should add to mySubset', function () {
    mySubset.addToSubset('nc:Card');
    expect(mySubset.getSubset()).toEqual(['nc:Card']);
  });


  it('should remove from mySubset', function () {
    mySubset.addToSubset('nc:Person');
    mySubset.removeFromSubset('nc:DateRange'); // remove invalid
    mySubset.removeFromSubset('nc:Card'); // from add to my subset test
    expect(mySubset.getSubset()).toEqual(['nc:Person']);
  });

});
