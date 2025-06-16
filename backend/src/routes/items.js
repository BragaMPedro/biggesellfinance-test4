const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();
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
}

async function writeData(data) {
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');

  } catch (error) {
    throw new Error(error.stack);
  }
}

// GET /api/items
router.get('/', async (req, res, next) => {

  try {
    const data = await readData();
    const { limit, q } = req.query;
    let results = data;

    if (q) {
      // Simple substring search (sub‑optimal)
      results = results.filter(item => item.name.toLowerCase().includes(q.toLowerCase()));
    }

    if (limit) {
      results = results.slice(0, parseInt(limit));
    }
    
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get('/:id', async (req, res, next) => {
  try {
    const data = await readData();
    const item = data.find(i => i.id === parseInt(req.params.id));
    if (!item) {
      const err = new Error('Item not found');
      err.status = 404;
      throw err;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post('/', async (req, res, next) => {
  try {
    // TODO: Validate payload (intentional omission)
    const item = req.body;
    const data = await readData();
    item.id = Date.now();
    data.push(item);
    await writeData(data)
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;