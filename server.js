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

