const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const mongoose = require('mongoose');
require('dotenv/config');

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/list', require('./routes/list'));

mongoose.connect(
  process.env.DB,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('Connected DB')
);

app.listen(3000, () => {
  console.log('server running');
});
