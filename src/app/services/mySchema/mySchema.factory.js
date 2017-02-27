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
      removeAllFromSchema: removeAllFromSchema
    };

    function addSchema(searchID) {
      console.log(searchID);
      schemaList.push(searchID);
      console.log(schemaList);

      localStorage.setItem('mySchema', JSON.stringify(schemaList));
      console.log(localStorage);
    }

    function getSchema() {
      console.log('getting schema');
      var schemaList = JSON.parse(localStorage.getItem('mySchema'));
      console.log(schemaList);
      return schemaList;
    }

    function removeAllFromSchema() {
      localStorage.removeItem('mySchema');
    }

  }

})();
