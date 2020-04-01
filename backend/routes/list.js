const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

//Get All items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get Single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json.send(res);
  } catch (err) {
    res.send({ msg: err });
  }
});

//Create item
router.post('/', async (req, res) => {
  const { value, isCompleted } = req.body;

  const item = new Item({
    value,
    isCompleted
  });
  try {
    const items = await item.save();
    res.send(items);
  } catch (err) {
    res.json({ msg: err });
  }
});

//Update Single item
router.patch('/:id', async (req, res) => {
  const { newValue } = req.body;

  try {
    const editedItem = await Item.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isCompleted: newValue
        }
      }
    );
    res.send(editedItem);
  } catch (err) {
    res.send({ msg: err });
  }
});

//Delete Single item
router.delete('/:id', async (req, res) => {
  try {
    const removedItem = await Item.findByIdAndDelete(req.params.id);
    res.send(removedItem);
  } catch (err) {
    res.send({ msg: err });
  }
});

module.exports = router;
