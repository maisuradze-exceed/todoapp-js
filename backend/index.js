const express = require('express');
const app = express();
const logger = require('./middleware/logger');

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/list', require('./routes/list'));

app.listen(3000, () => {
  console.log('server running');
});
