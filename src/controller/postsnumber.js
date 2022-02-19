const express = require('express');
const Post = require('../models/Post');
const { mapToFilter, filterValidation, generateFilterQuery } = require('../utils/validationSchemasJoi');
const logger = require("../utils/logger");

//@route: api/v1/postsnumber
const router = express.Router();


/**
 * @route:  Get /
 * @description: Get the number of posts according to user request
 * @access: Public
 */
router.get('/',
  (async (req, res) => {
    try {
      const filterOptions = mapToFilter(req.query);
      const validationError = filterValidation(filterOptions);
      if (validationError) {
        return res.status(400).send(validationError);
      }
      const query = generateFilterQuery(filterOptions);
      const postsnumber = await Post.find(query).countDocuments();
      res.json({postsnumber});

    } catch (error) {
      logger.error(`Error on ${req.method} ${req.originalUrl} error = `, error);
      res.status(500).json({ message: "failed to get posts number." });
    }
  }));


module.exports = router;