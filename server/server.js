
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const requestController = require('./Controllers/requestController');

const app = express();
const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

const PORT = 5000;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// LOGIN HANDLER
app.post('/login', requestController.verifyUser, (req, res) => {
  console.log('Received Login request')
  console.log('Request Body: ', req.body);
  if (res.locals.response)
    return res.json({ authorized: true, data: res.locals.response });
  else
    return res.json({ authorized: false });
})

// REGISTER HANDLER
app.post('/register', requestController.addUser, (req, res) => {
  console.log('Received Register request')
  console.log('Request Body: ', req.body);
  if (res.locals.response)
    return res.json({ authorized: true });
  else
    return res.json({ authorized: false });
})


// ADD WATCHLIST HANDLER
app.post('/addWatch', (req, res) => {
  // console.log('Received Register request')
  // console.log('Request Body: ', req.body);
  return res.json({ authorized: true });
})

// app.get('/other', requestController.getOthers, (req, res) => {
//   return res.json();
// })

// GLOBAL EVENT HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});