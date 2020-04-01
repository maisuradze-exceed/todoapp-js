const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
require('dotenv/config');

app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/list', require('./routes/list'));

mongoose.connect(
  process.env.DB,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('Connected DB')
);

app.listen(3000, () => {
  console.log('server running');
});
