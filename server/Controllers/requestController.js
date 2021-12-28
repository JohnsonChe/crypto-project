import fetch from 'node-fetch';
const User = require('../models/userModel');
const requestController = {};

/**
 * getAllUsers - retrieve all users from the database and stores it into res.locals
 * before moving on to next middleware.
 */
requestController.getOthers = async (req, res, next) => {
  const data = await fetch('https://api.coingecko.com/api/v3/search/trending');
  await console.log('data', data);
  res.locals.data = data;
  return next();
};


module.exports = requestController;
