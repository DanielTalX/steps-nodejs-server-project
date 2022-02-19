const express = require('express');
const Post = require('../models/Post');
const Statistics = require('../models/Statistics');
const logger = require("../utils/logger");

//@route: api/v1/statistics/
const router = express.Router();

/**
 * @route:  Get /
 * @description: Get the top 10 of post creators
 * @access: Public
 */
router.get('/topcreators',
  //verifyAccessToken(),
  (async (req, res) => {
    try {
      let query = [
        {
          $group: {
            _id: { username: "$username" },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }];

      const items = await Post.aggregate(query).limit(10);
      const values = items.map((item) => {
        return {
          username: item._id.username,
          count: item.count
        }
      });
      res.json(values);
    } catch (error) {
      logger.error(`Error on ${req.method} ${req.originalUrl} error = `, error);
      res.status(500).json({ message: "failed to get top 10 of post creators." });
    }
  }));

/**
 * @route:  Get /
 * @description: Get lists of statistics runtimes
 * @access: Public
 */
router.get('/runtimes',
  //verifyAccessToken(),
  (async (req, res) => {
    try {
      const query = { resource: { $in: ['getPosts', 'addPost'] } }
      const items = await Statistics.find(query);
      const runtimes = items.map((item) => {
        return {
          resource: item.resource,
          avgTime: ((item.totalRequests > 0) ? (item.totalTime / item.totalRequests) : 0)
        }
      });
      res.json(runtimes);
    } catch (error) {
      logger.error(`Error on ${req.method} ${req.originalUrl} error = `, error);
      res.status(500).json({ message: "failed to get statistics runtimes." });
    }
  }));

module.exports = router;