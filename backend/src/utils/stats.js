/**
 * Iterates the items of an Array and returns the mean of the selected item prop
 * 
 * @function mean
 * @param {any[]} arr - Array having items for the calculations
 * @param {string} prop - Item property to iterate
 * @returns {number} Mean of the iterated array item property
 */
function mean(arr, prop) {

  return arr.reduce((acc, item) => acc + item[prop], 0) / arr.length;
}

module.exports = { mean };