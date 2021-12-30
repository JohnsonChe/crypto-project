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

module.exports = { mongoose };