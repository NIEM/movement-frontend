'use strict';

describe('factory:mySchema', function () {

  // load the factory's module
  beforeEach(angular.mock.module('dhsniem'));

  var mySchema;

  // initialize a new instance of the factory before each test
  beforeEach(inject(function ($injector) {
    mySchema = $injector.get('mySchema');
  }));

  it('condition of test', function () {

  });

});
