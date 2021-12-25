
const express = require('express');

const app = express();

const PORT = 5000;

// LOGIN HANDLER
app.use('/login', (req,res) => {
  console.log('Received Login request')
  return res.send('HI');
})


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