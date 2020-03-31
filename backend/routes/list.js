const express = require('express');
const router = express.Router();
const data = require('../data');

//Get All items
router.get('/', (req, res) => res.json(data));

//Get Single item
router.get('/:id', (req, res) => {
  const found = data.some(element => element.id === parseInt(req.params.id));

  if (found) {
    res.json(data.filter(element => element.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No Item with id ${req.params.id}` });
  }
});

//Create item
router.post('/', (req, res) => {
  const newItem = {
    id: data.length + 1,
    value: req.body.value,
    isTrue: false
  };

  if (!newItem.value) {
    return res.status(400).json({ msg: 'Value cannot be empty' });
  }

  data.push(newItem);
  res.json(data);
});

//Update Single item
router.put('/:id', (req, res) => {
  const found = data.some(element => element.id === parseInt(req.params.id));

  if (found) {
    const updItem = req.body;
    data.forEach(element => {
      if (element.id === parseInt(req.params.id)) {
        element.value = updItem.value ? updItem.value : element.value;
        element.isTrue = updItem.isTrue ? updItem.isTrue : element.isTrue;

        res.json({ msg: 'Item updated', element });
      }
    });
  } else {
    res.status(400).json({ msg: `No Item with id ${req.params.id}` });
  }
});

//Delete Single item
router.delete('/:id', (req, res) => {
  const found = data.some(element => element.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Deleted',
      data: data.filter(element => element.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No Item with id ${req.params.id}` });
  }
});

module.exports = router;
