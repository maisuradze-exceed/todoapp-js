const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  },
  isTrue: {
    type: Boolean,
    default: 'false'
  }
});

module.exports = mongoose.model('Item', ItemSchema);
