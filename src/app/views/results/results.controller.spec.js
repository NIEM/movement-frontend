'use strict';

describe('Controller: ResultsCtrl', function() {

  // load the controller's module
  beforeEach(module('dhsniem'));
  beforeEach(module('templates'));

  var ResultsCtrl, solrSearch;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    solrSearch = $injector.get('solrSearch');
    spyOn(solrSearch, 'search');
    ResultsCtrl = $injector.get('$controller')('ResultsCtrl');
  }));

  it('should initialize', function () {
    expect(solrSearch.search).toHaveBeenCalled();
  });

});
