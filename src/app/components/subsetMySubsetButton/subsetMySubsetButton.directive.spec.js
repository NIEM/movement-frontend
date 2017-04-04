'use strict';

describe('directive:subsetMySubsetButton', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');

    element = angular.element('<subset-my-subset-button></subset-my-subset-button>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.scope();
  }));


});
