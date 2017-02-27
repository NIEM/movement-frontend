'use strict';

/**
 * @ngdoc factory
 *
 * @name mySchemaCart
 *
 * @description
 * Factory for my schema cart
 */
(function () {

  angular
    .module('dhsniem')
    .factory('mySchemaCart', mySchemaCart);

  function mySchemaCart ($q, $http, SOLR_URL) {

    if (!localStorage.getItem('mySchema')) {
      var schemaList = [];
    } else {
      var schemaList = JSON.parse(localStorage.getItem('mySchema'));
    }


    return {
      addSchema: addSchema,
      getSchema: getSchema,
      removeFromSchema: removeFromSchema
      // removeAllFromSchema: removeAllFromSchema

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


    function removeFromSchema() {
      localStorage.removeItem('mySchema');

    }


    function removeAllFromSchema() {

    }

    function mySchemaCount() {

    }

  }

})();
