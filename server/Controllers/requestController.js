const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://johnson:1231@cluster0.cd3mr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// mongoose.Promise = global.Promise;
//process.env.MONGODB_URI
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'solo-project'
}).then(() => {
  console.log('Connected to Mongo DB.');
}).catch(err => console.log(err));



const User = require('../models/userModel');
const requestController = {};

/**
 * getAllUsers - retrieve all users from the database and stores it into res.locals
 * before moving on to next middleware.
 */
requestController.addUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    res.locals.response = await User.create({
      firstName,
      lastName,
      email,
      password
    })
    return next();
  } catch (error) {
    return next(error)
  }
};

requestController.verifyUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({
      email: email,
      password: password
    })

    if (!data)
      res.locals.response = false;
    else
      res.locals.response = {
        firstName: data.firstName,
        lastName: data.lastName,
        watchList: data.watchList
      };

    return next();

  } catch (error) {
    return next(error)
  }
};

requestController.addWatch = async (req, res, next) => {
  try {
    const { email, id } = req.body;
    const data = await User.findOneAndUpdate(
      { email: email },
      { $push: { 'watchList': id } },
      { new: true });

    if (!data)
      res.locals.response = false;
    else
      res.locals.response = {
        firstName: data.firstName,
        lastName: data.lastName,
        watchList: data.watchList
      };

    return next();

  } catch (error) {
    return next(error)
  }
};

module.exports = requestController;
