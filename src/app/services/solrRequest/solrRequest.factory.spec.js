'use strict';
describe('Factory: solrRequest', function() {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));
  var solrRequest, $httpBackend, SOLR_URL;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    SOLR_URL = $injector.get('SOLR_URL');
    solrRequest = $injector.get('solrRequest');

    $httpBackend.whenJSONP(new RegExp('\\' + SOLR_URL)).respond(200, {});

  }));

  it('should make the solr request', function () {
    solrRequest.makeSolrRequest();
    $httpBackend.flush();
    $httpBackend.expectJSONP(new RegExp('\\' + SOLR_URL));
  });

});
