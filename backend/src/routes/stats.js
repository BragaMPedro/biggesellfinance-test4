const fs = require("fs/promises");
const express = require("express");
const router = express.Router();
const path = require("path");
const DATA_PATH = path.join(__dirname, "../../../data/items.json");
const { mean } = require("../utils/stats");
const { readData } = require("../utils/items");

/**
 * @typedef Stats
 * @property {number} total - Total items count
 * @property {number} averagePrice - Items average price
 */

/**
 * @type Stats
 */
let cachedStats = null;
let lastTimeCached = 0;

// GET /api/stats
router.get("/", async (req, res, next) => {
   try {
      //Cache Check
      const dataFileStats = await fs.stat(DATA_PATH); // Obtém metadados do arquivo
      const lastFileUpdate = dataFileStats.mtimeMs;
      
      if (cachedStats && lastTimeCached === lastFileUpdate) {
         res.json(cachedStats);

      } else {
         //Calculates updated stats
         const items = await readData();
         const newStats = {
            total: items.length,
            averagePrice: mean(items, "price"),
         };
         cachedStats = newStats;
         lastTimeModified = lastFileUpdate;

         res.json(cachedStats);
      }
   } catch (err) {
      next(err);
   }
});

module.exports = router;
