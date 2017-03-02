'use strict';

/**
 * @ngdoc factory
 *
 * @name mySchema
 *
 * @description
 * Factory for my schema cart
 */
(function () {

  angular
    .module('dhsniem')
    .factory('mySchema', mySchema);

  function mySchema () {

    if (localStorage.getItem('mySchema')) {
      var schemaList = JSON.parse(localStorage.getItem('mySchema'));
    } else {
      var schemaList = [];
    }

    return {
      addSchema: addSchema,
      getSchema: getSchema,
      removeAllFromSchema: removeAllFromSchema,
      removeFromSchema: removeFromSchema,
      getSchemaCount: getSchemaCount
    };

    function addSchema(searchID) {
      schemaList.push(searchID);
      localStorage.setItem('mySchema', JSON.stringify(schemaList));
    }

    function getSchema() {
      var schemaList = JSON.parse(localStorage.getItem('mySchema'));
      return schemaList;
    }

    function removeAllFromSchema() {
      localStorage.clear();
    }

    function getSchemaCount() {
      var schemaCount = JSON.parse(localStorage.getItem('mySchema')).length;
      return schemaCount;
    }

    function removeFromSchema(searchID) {

    }
  }

})();
