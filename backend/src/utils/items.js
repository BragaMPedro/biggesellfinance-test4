const fs = require('fs/promises');
const path = require('path');
const DATA_PATH = path.join(__dirname, '../../../data/items.json');

/**
 * @typedef {object} Item
 * @property {number} id - Unique identifier.
 * @property {string} name - Items name.
 * @property {string} category - Items category.
 * @property {number} price - Items price.
 */

/**
 * Asynchronously reads data from a specified file path and parses it as JSON.
 *
 * @function readData
 * @async
 * @returns {Promise<Item[]>} A promise that resolves with the JSON parsed Item.
 * @throws {Error} Throws an error providing the errors stack trace.
 */
async function readData() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(error.stack);
  }
};

/**
 * Asynchronously writes a given JavaScript object to a file as a JSON string.
 * The JSON output will be formatted with 2 spaces for indentation.
 *
 * @function writeData
 * @async
 * @param {Item[]} items - Updated Items list to record at data.
 * @returns {Promise<void>} A Promise that resolves when the data has been successfully written.
 * @throws {Error} Throws an error if the data cannot be written to the file,
 * providing the stack trace of the original error.
 */ 
async function writeData(items) {
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), 'utf8');

  } catch (error) {
    throw new Error(error.stack);
  }
};

module.exports = { readData, writeData };