'use strict';

describe('factory:niemTree', function () {

  // load the factory's module
  beforeEach(angular.mock.module('dhsniem'));

  var niemTree;

  // initialize a new instance of the factory before each test
  beforeEach(inject(function ($injector) {
    niemTree = $injector.get('niemTree');
  }));

});
