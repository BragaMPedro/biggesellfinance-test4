const express = require('express');
const router = express.Router();
const mean = require('../utils/stats/mean')

let currentStats = null;
let currentItems = null;

// GET /api/stats
router.get('/', async (req, res, next) => {
  try{
    const items = await readData();

    if(currentItems !==  JSON.stringify(items) ){
      const newStats = {
        total: items.length,
        averagePrice: mean(items, 'price')
      };
      currentStats = newStats;
    }

    res.json(currentStats);
  } catch (err){
    next(err);
  }
});

module.exports = router;