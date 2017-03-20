'use strict';

describe('Directive: niemHeader', function () {

  // load the directive's module and view
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, $compile, elScope, $location;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');


    element = angular.element('<niem-header></niem-header>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.scope();
  }));

  it('should skip to content', inject(function () {
    elScope.skipToContent('main'); // no content
    var contentEl = '<div id="main"></div>';
    angular.element(document.body).append(contentEl);
    elScope.skipToContent('main'); // with content
    expect($location.hash()).toEqual('main');
  }));

});