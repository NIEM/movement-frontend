'use strict';

describe('directive:solrMySchemaDetails', function () {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');

    element = angular.element('<solr-my-schema-details></solr-my-schema-details>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.scope();
  }));


});
