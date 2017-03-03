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

  function mySchema() {

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
      localStorage.removeItem('mySchema');
    }

    function getSchemaCount() {
      if (getSchema()) {
        var schemaCount = JSON.parse(localStorage.getItem('mySchema')).length;
      } else {
        var schemaCount = 0;
      }
      return schemaCount;
    }


    function removeFromSchema(searchID) {

    }
  }

})();
