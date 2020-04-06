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

//Paginated Items
router.get('/lists', paginatedResults(Item), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const { pagereq, limitreq } = req.query;
    const page = +pagereq;
    const limit = +limitreq;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

//Create item
router.post('/', async (req, res) => {
  const { value, isCompleted } = req.body;

  const item = new Item({
    value,
    isCompleted,
  });
  try {
    const items = await item.save();
    const allitems = await Item.find();
    res.send(allitems);
  } catch (err) {
    res.json({ msg: err });
  }
});

//Update Single item
router.patch('/:id', async (req, res) => {
  try {
    const editedItem = await Item.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          value: req.body.text,
          isCompleted: req.body.check,
        },
      }
    );
    const items = await Item.find();
    res.send(items);
  } catch (err) {
    res.send({ msg: err });
  }
});

//Update multiple items
router.patch('/multiple/:id', async (req, res) => {
  try {
    const arr = await req.params.id.split(',');
    const myquery = { _id: { $in: arr } };
    const items = await Item.updateMany(myquery, {
      $set: {
        isCompleted: req.body.check,
      },
    });
    console.log(items);
    // res.json(items);
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

//Delete multiple items
router.delete('/multiple/:id', async (req, res) => {
  try {
    const arr = await req.params.id.split(',');
    const myquery = { _id: { $in: arr } };
    const removedItem = await Item.deleteMany(myquery);
    res.send(removedItem);
  } catch (err) {
    res.send({ msg: err });
  }
});

module.exports = router;
