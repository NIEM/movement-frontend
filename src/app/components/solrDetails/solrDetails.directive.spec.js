'use strict';

describe('directive:solrDetails', function() {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var element, scope, elScope, $compile, solrRequest, $location, $window, $httpBackend, SOLR_URL;

  // Initialize a mock scope
  beforeEach(inject(function ($injector) {
    scope = $injector.get('$rootScope').$new();
    $compile = $injector.get('$compile');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');
    $window = $injector.get('$window');
    SOLR_URL = $injector.get('SOLR_URL');
    solrRequest = $injector.get('solrRequest');
    $location.search('entityID', 'Core:Alert');

    $httpBackend.whenJSONP(new RegExp('\\' + SOLR_URL)).respond(200, {});

    element = angular.element('<solr-details></solr-details>');
    element = $compile(element)(scope);
    scope.$apply();
    elScope = element.scope();
  }));

  it('should go back to search results', function () {
    spyOn($window.history, 'back');
    elScope.goBack();
    expect($window.history.back).toHaveBeenCalled();
  });

});
