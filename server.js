const app = require('./lib/app');
const pool = require('./lib/utils/pool');

const express = require('express');
const bodyParser = require('body-parser');
const appAWS = express();
const sesClient = require('./ses-client');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

process.on('exit', () => {
  console.log('Goodbye!');
  pool.end();
});

appAWS.use(bodyParser.urlencoded({ extended: false }));  
appAWS.use(bodyParser.json());

appAWS.get('/', (req, res) => {
    // call sesClient to send an email
    sesClient.sendEmail('user@example.com', "Hey! Welcome", "This is the body of email");
    
    res.send('Email is sent!');
});

appAWS.listen(3000, () => {
    console.log('App is listening on port 3000');
});