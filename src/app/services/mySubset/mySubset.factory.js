'use strict';

/**
 * @ngdoc factory
 *
 * @name mySubset
 *
 * @description
 * Factory for my subset cart
 */
(function () {

  angular
    .module('dhsniem')
    .factory('mySubset', mySubset);

  function mySubset() {

    return {
      addToSubset: addToSubset,
      getSubset: getSubset,
      removeAllFromSubset: removeAllFromSubset,
      removeFromSubset: removeFromSubset,
      getSubsetCount: getSubsetCount
    };

    /**
     * @name addToSubset
     *
     * @description Adds a new entityID to the local storage subset
     *
     * @param {String} - entityID
     */
    function addToSubset(entityID) {
      var newSubset = getSubset();
      newSubset.push(entityID);
      setSubset(newSubset);
    }


    /**
     * @name getSubset
     *
     * @description Returns the mySubset JSON object from local storage
     *
     * @returns String[] - array of entity ids  
     */
    function getSubset() {
      return localStorage.getItem('mySubset') ? JSON.parse(localStorage.getItem('mySubset')) : [];
    }


    /**
     * @name setSubset
     *
     * @description Sets the mySubset JSON object to local storage
     *
     * @param {Object} - subset
     */
    function setSubset(subset) {
      localStorage.setItem('mySubset', JSON.stringify(subset));
    }


    /**
     * @name removeAllFromSubset
     *
     * @description Removes all items from the mySubset local storage object
     */
    function removeAllFromSubset() {
      setSubset([]);
    }


    /**
     * @name getSubsetCount
     *
     * @description Returns the count of the mySubset local storage array
     *
     * @return Number - the length of the mySubset array
     */
    function getSubsetCount() {
      return getSubset().length;
    }


    /**
     * @name removeFromSubset
     *
     * @description Removes an entity ID from the mySubset local storage array
     *
     * @param entityID - the entityID to be removed from mySubset
     */
    function removeFromSubset(entityID) {
      var subset = getSubset();
      var idIndex = subset.indexOf(entityID);
      if (idIndex > -1) {
        subset.splice(idIndex, 1);
        setSubset(subset);
      }
    }
  }

})();
