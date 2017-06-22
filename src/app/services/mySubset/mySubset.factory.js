'use strict';

/**
 * @ngdoc factory
 * @memberof dhsniem
 * @name mySubset
 * @description Factory for my subset generator
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
     * @memberof mySubset
     * @param {String} entityID The Id of the entity to add to the subset
     * @description Adds a new entityID to the local storage subset
     */
    function addToSubset(entityID) {
      var newSubset = getSubset();
      newSubset.push(entityID);
      setSubset(newSubset);
    }


    /**
     * @memberof mySubset
     * @returns {String[]} An array of entity ids  
     * @description Returns the mySubset JSON object from local storage
     */
    function getSubset() {
      return localStorage.getItem('mySubset') ? JSON.parse(localStorage.getItem('mySubset')) : [];
    }


    /**
     * @memberof mySubset
     * @param {Object} subset The current subset object
     * @description Sets the mySubset JSON object to local storage
     */
    function setSubset(subset) {
      localStorage.setItem('mySubset', JSON.stringify(subset));
    }


    /**
     * @memberof mySubset
     * @description Removes all items from the mySubset local storage object
     */
    function removeAllFromSubset() {
      setSubset([]);
    }


    /**
     * @memberof mySubset
     * @returns {Number} The length of the mySubset array
     * @description Returns the count of the mySubset local storage array
     */
    function getSubsetCount() {
      return getSubset().length;
    }


    /**
     * @memberof mySubset
     * @param {String} entityID The entityID to be removed from mySubset
     * @description Removes an entity ID from the mySubset local storage array
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
