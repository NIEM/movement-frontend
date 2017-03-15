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

    return {
      addToSchema: addToSchema,
      getSchema: getSchema,
      removeAllFromSchema: removeAllFromSchema,
      removeFromSchema: removeFromSchema,
      getSchemaCount: getSchemaCount
    };

    /**
     * @name addToSchema
     *
     * @description Adds a new entityID to the local storage schema
     *
     * @param {String} - entityID
     */
    function addToSchema(entityID) {
      var newSchema = getSchema();
      newSchema.push(entityID);
      setSchema(newSchema);
    }


    /**
     * @name getSchema
     *
     * @description Returns the mySchema JSON object from local storage
     *
     * @returns String[] - array of entity ids  
     */
    function getSchema() {
      return localStorage.getItem('mySchema') ? JSON.parse(localStorage.getItem('mySchema')) : [];
    }


    /**
     * @name setSchema
     *
     * @description Sets the mySchema JSON object to local storage
     *
     * @param {Object} - schema
     */
    function setSchema(schema) {
      localStorage.setItem('mySchema', JSON.stringify(schema));
    }


    /**
     * @name removeAllFromSchema
     *
     * @description Removes all items from the mySchema local storage object
     */
    function removeAllFromSchema() {
      setSchema([]);
    }


    /**
     * @name getSchemaCount
     *
     * @description Returns the count of the mySchema local storage array
     *
     * @return Number - the length of the mySchema array
     */
    function getSchemaCount() {
      return getSchema().length;
    }


    /**
     * @name removeFromSchema
     *
     * @description Removes an entity ID from the mySchea local storage array
     *
     * @param entityID - the entityID to be removed from mySchema
     */
    function removeFromSchema(entityID) {
      var schema = getSchema();
      var idIndex = schema.indexOf(entityID);
      if (idIndex > -1) {
        schema.splice(idIndex, 1);
        setSchema(schema);
      }
    }
  }

})();
