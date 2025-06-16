const express = require('express');
const router = express.Router();
const items = require('../utils/items')

/**
 * Formats a given string by removing diacritics (accents), converting it to lowercase,
 * and normalizing its Unicode representation.
 *
 * @function formatString
 * @param {string} str - String input.
 * @returns {string} The formatted string, without accents and in lowercase.
 */
function formatString(str) {
  const formattedStr = str.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return formattedStr;
}

// GET /api/items
router.get('/', async (req, res, next) => {

  try {
    const data = await items.readData();
    const { limit, q } = req.query;
    let results = data;

    //Query Logic
    if (q) {
      const query = formatString(q)

      results = results.filter(item => {
        formatString(item.name).includes(query) ||
        formatString(item.category).includes(query)
      });
    }

    //Limit logic default = 20;
    if (limit) {
      results = results.slice(0, parseInt(limit));
    } else {
      results = results.slice(0, 20);
    }
    
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get('/:id', async (req, res, next) => {
  try {
    const data = await items.readData();
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
    const data = await items.readData();
    item.id = Date.now();
    data.push(item);
    await items.writeData(data)
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;