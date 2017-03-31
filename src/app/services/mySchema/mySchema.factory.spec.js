'use strict';

describe('factory:mySchema', function () {

  // load the factory's module
  beforeEach(angular.mock.module('dhsniem'));

  var mySchema;

  // initialize a new instance of the factory before each test
  beforeEach(inject(function ($injector) {
    mySchema = $injector.get('mySchema');
  }));

  it('should add to mySchema', function () {
    mySchema.addToSchema('nc:Card');
    expect(mySchema.getSchema()).toEqual(['nc:Card']);
  });


  it('should remove from mySchema', function () {
    mySchema.addToSchema('nc:Person');
    mySchema.removeFromSchema('nc:DateRange'); // remove invalid
    mySchema.removeFromSchema('nc:Card'); // from add to my schema test
    expect(mySchema.getSchema()).toEqual(['nc:Person']);
  });

});
