'use strict';

/**
 * @ngdoc directive
 * @memberof dhsniem
 * @name solrResults
 * @param {service} $rootScope The root scope of the application
 * @param {service} solrSearch A service that handles custom querying for the Solr API
 * @description Solr results
 * @example
 *  Usage:
 *  <solr-results></solr-results>
 */
(function () {

  angular
    .module('dhsniem')
    .directive('solrResults', solrResults);

  function solrResults(solrSearch, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/solrResults/solrResults.directive.html',
      link: link
    };

    /**
     *  Defines variables and functions within solr scope
     */
    function link(scope) {

      /**
       * @private
       * @description Initializes the view to set scope variables on page load and whenever a new search is triggered.
       */
      function init() {
        /**
         * @memberof solrResults
         * @property docs
         * @type {Object[]}
         * @description Array of solr result documents
         */
        scope.docs = solrSearch.getDocs();

        /**
         * @memberof solrResults
         * @property numFound
         * @type {Number}
         * @description Total number of results found
         */
        scope.numFound = solrSearch.getNumFound();

        /**
         * @memberof solrResults
         * @property query
         * @type {String}
         * @description The search query
         */
        scope.query = solrSearch.getQuery();

        /**
         * @memberof solrResults
         * @property totalPages
         * @type {Number}
         * @description Total pages of results
         */
        scope.totalPages = Math.ceil(scope.numFound / 100);

        /**
         * @memberof solrResults
         * @property sort
         * @type {String}
         * @description The current sort value
         */
        scope.sort = solrSearch.getSort();

        /**
         * @memberof solrResults
         * @property namespaceTypes
         * @type {Object}
         * @description Mapping of namespace types to formatted values
         */
        scope.namespaceTypes = {
          'domain': 'Domain',
          'externalStandard': 'External Standard'
        };

        /**
         * @memberof solrResults
         * @property popovers
         * @type {Object}
         * @description Mapping of popover labels to their templates
         */
        scope.popovers = {
          'core': {
            'popoverTemplateUrl': 'app/components/solrResults/corePopoverTemplate.html'
          }
        };

        /**
         * @memberof solrResults
         * @property errMessage
         * @type {String}
         * @description Error message for an invalid query
         */
        scope.errMessage = !scope.numFound && scope.query.length < 3 ? 'Your search must have at least 3 characters.' : 'The term "' + scope.query + '" has returned no results. Please try a different term or variation.';
      }

      init();

      $rootScope.$on('newSearch', function () {
        init();
      });

      /**
       * @memberof solrResults
       * @description Unselects all filters and adjusts displayed results accordingly
       */
      scope.clearAllFilters = function () {
        solrSearch.clearAllFilters();
      };


      /**
       * @memberof solrResults
       * @param {String} previousNamespace The previous row's (doucment's) namespace
       * @param {Object} currentDoc The current row (document)
       * @returns {boolean}
       * @description Determines if a listed row (document) is the first instance of its namespace in order. Used for grouping when the results are sorted by namespace.
       */
      scope.isFirstOfNamespace = function (previousNamespace, currentDoc) {
        if (scope.sort === 'namespacePriority asc') {
          if (currentDoc.namespace !== previousNamespace) {
            currentDoc.namespaceCount = solrSearch.getFacet(currentDoc.namespaceType)[currentDoc.namespace];
            return true;
          }
        }
        return false;
      };


      /**
       * @memberof solrResults
       * @param {String} previousName The previous row's (doucment's) name
       * @param {String} currentName The current row's (document's) name
       * @param {Number} index The current row's (document's) index
       * @returns {boolean}
       * @description Determines if a listed row (document) is the first instance of its starting letter. Used for grouping when the results are sorted by name (alphabetically).
       */
      scope.isFirstOfAlphabet = function (previousName, currentName, index) {
        return scope.sort === 'name asc' && (index < 1 || currentName.substring(0, 1).toUpperCase() !== previousName.substring(0, 1).toUpperCase());
      };

    }
  }
})();
