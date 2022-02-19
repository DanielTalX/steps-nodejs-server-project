// https://joi.dev/api/?v=17.4.1
const Joi = require('joi');
// Schemas that help check if the input values are valid

/**
 * Taking the relevant fields obtained from the user.
 * @returns A new Post to be added to the database
 */
function mapToNewPost(data) {
    const { username, title, body, subject } = data;
    const item = { username, title, body, subject };
    return item;
}

/**
 * Taking the relevant fields to be returned to the end user.
 * And hide fields that indicate mongoDB usage
 * @param {PostSchema} data 
 * @returns Post
 */
function mapToPost(data) {
    const { _id, username, title, body, subject, insertionTime } = data;
    const item = { id: _id, username, title, body, subject, insertionTime };
    return item;
}

const PostValidionSchema = Joi.object({
    username: Joi.string().alphanum().min(8).max(80).required(),
    title: Joi.string().min(2).max(30).required(),
    body: Joi.string().min(2).max(2000).required(),
    subject: Joi.string().min(2).max(50).required()
});

/**
 * Check whether the data is valid and Post type.
 * Otherwise, return an error.
 */
function postValidation(data) {
    const validation = PostValidionSchema.validate(data);
    if (!!validation.error)
        return validation.error.details[0].message;
    return null;
}

/**
 * Taking the relevant fields obtained from the user if they exist.
 */
function mapToFilter(data) {
    const { username, title, subject, start, end, limit } = data;
    const item = {};
    if (username) item['username'] = username;
    if (title) item['title'] = title;
    if (subject) item['subject'] = subject;
    if (start) item['start'] = start;
    if (end) item['end'] = end;
    if (limit) item['limit'] = parseInt(limit);
    return item;
}

const FilterValidionSchema = Joi.object({
    username: Joi.string().alphanum().min(8).max(80),
    title: Joi.string().min(2).max(30),
    subject: Joi.string().min(2).max(50),
    start: Joi.date().default(new Date() - 7).greater(new Date(1999)),
    end: Joi.date().greater(Joi.ref('start')),
    limit: Joi.number().default(50).min(1).max(100),
});

/**
 * Check whether the data is valid.
 * Otherwise, return an error.
 */
function filterValidation(data) {
    const validation = FilterValidionSchema.validate(data);
    if (!!validation.error)
        return validation.error.details[0].message;
    return null;
}

/**
 * Generates a query to filter by the fields obtained.
 */
function generateFilterQuery(filterOptions) {
    const query = {};
    const { username, title, subject, start, end, limit } = filterOptions;
    if (username)
        query['username'] = username;
    if (title)
        query['title'] = title; // `/^{{title}}/`
    if (subject)
        query['subject'] = subject;
    if (start)
        query['insertionTime'] = { $gte: start };
    if (start && end)
        query['insertionTime'] = { $gte: start, $lte: end };
    return query;
}


module.exports.postValidation = postValidation;
module.exports.mapToNewPost = mapToNewPost;
module.exports.mapToPost = mapToPost;
module.exports.mapToFilter = mapToFilter;
module.exports.filterValidation = filterValidation;
module.exports.generateFilterQuery = generateFilterQuery;
