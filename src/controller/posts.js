const express = require('express');
const Post = require('../models/Post');
const { mapToNewPost, mapToPost, postValidation, mapToFilter,
  filterValidation, generateFilterQuery } = require('../utils/validationSchemasJoi');
const logger = require("../utils/logger");

//@route: api/v1/posts
const router = express.Router();

/**
 * @route:  POST /
 * @description: add a new Post to DB
 * @access: Public
 */
router.post('/', (async (req, res) => {
  try {
    const item = mapToNewPost(req.body);
    const validationError = postValidation(item);
    if (validationError) {
      return res.status(400).send(validationError);
    }

    const post = new Post(item);
    const savedItem = await post.save();
    res.json(mapToPost(savedItem));
  } catch (error) {
    logger.error(`Error on ${req.method} ${req.originalUrl} error = `, error);
    return res.status(500).send("failed to add this post.");
  }
}));


/**
 * @route:  Get /
 * @description: Get lists of posts according to user request
 * @access: Public
 */
router.get('/',
  calcReqeustRuntime('addPost'),
  (async (req, res) => {
    try {
      const filterOptions = mapToFilter(req.query);
      const validationError = filterValidation(filterOptions);
      if (validationError) {
        return res.status(400).send(validationError);
      }
      const query = generateFilterQuery(filterOptions);
      const items = await Post.find(query).sort({ date: -1 }).limit(filterOptions.limit);
      const values = items.map(item => mapToPost(item));
      res.json(values);
    } catch (error) {
      logger.error(`Error on ${req.method} ${req.originalUrl} error = `, error);
      res.status(500).json({ message: "failed to get posts." });
    }
  }));


/**
 * @route:  Get /postsnumber
 * @description: Get the number of posts according to user request
 * @access: Public
 */
router.get('/postsnumber',
  calcReqeustRuntime('addPost'),
  (async (req, res) => {
    try {
      const filterOptions = mapToFilter(req.query);
      const validationError = filterValidation(filterOptions);
      if (validationError) {
        return res.status(400).send(validationError);
      }
      const query = generateFilterQuery(filterOptions);
      const postsnumber = await Post.find(query).countDocuments();
      res.json(postsnumber);

    } catch (error) {
      logger.error(`Error on ${req.method} ${req.originalUrl} error = `, error);
      res.status(500).json({ message: "failed to get posts number." });
    }
  }));


module.exports = router;