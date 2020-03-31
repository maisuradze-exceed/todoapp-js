const express = require('express');
const router = express.Router();
const data = require('../data');
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
    res.send(item);
  } catch (err) {
    res.send({ msg: err });
  }
});

//Create item
router.post('/', async (req, res) => {
  // const newItem = {
  //   id: data.length + 1,
  //   value: req.body.value,
  //   isTrue: false
  // };

  // if (!newItem.value) {
  //   return res.status(400).json({ msg: 'Value cannot be empty' });
  // }

  // data.push(newItem);
  // res.json(data);

  const { value, isTrue } = req.body;

  const item = new Item({
    value,
    isTrue
  });
  try {
    const savedPost = await item.save();
    res.send(savedPost);
  } catch (err) {
    res.json({ msg: err });
  }
});

//Update Single item
router.put('/:id', async (req, res) => {
  // const found = data.some(element => element.id === parseInt(req.params.id));
  // if (found) {
  //   const updItem = req.body;
  //   data.forEach(element => {
  //     if (element.id === parseInt(req.params.id)) {
  //       element.value = updItem.value ? updItem.value : element.value;
  //       element.isTrue = updItem.isTrue ? updItem.isTrue : element.isTrue;
  //       res.json({ msg: 'Item updated', element });
  //     }
  //   });
  // } else {
  //   res.status(400).json({ msg: `No Item with id ${req.params.id}` });
  // }
  const { value, isTrue } = req.body;
  try {
    const editedItem = await Item.updateOne(req.body.id, {
      $set: {
        value,
        isTrue: isTrue || false
      }
    });
    res.send(editedItem);
  } catch (err) {
    res.send({ msg: err });
  }
});

//Delete Single item
router.delete('/:id', async (req, res) => {
  // const found = data.some(element => element.id === parseInt(req.params.id));

  // if (found) {
  //   res.json({
  //     msg: 'Deleted',
  //     data: data.filter(element => element.id !== parseInt(req.params.id))
  //   });
  // } else {
  //   res.status(400).json({ msg: `No Item with id ${req.params.id}` });
  // }
  try {
    const removedItem = await Item.deleteOne(req.body.id);
    res.send(removedItem);
  } catch (err) {
    res.send({ msg: err });
  }
});

module.exports = router;
