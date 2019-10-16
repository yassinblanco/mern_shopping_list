const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public

router.get('/', (req, res) => {
   Item.find()
       .sort({date: -1})
       .then( items => res.json(items))
       .catch(err => res.status(400).send(err))
});

// @route POST api/items
// @desc Post An Item
// @access Public

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then( item => res.json(item))
                  .catch( err => res.status(400).send(err));
});

// @route DELETE api/items/:id
// @desc Delete An Item
// @access Public

router.delete('/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id).then( item => res.json(item))
                                         .catch( err => res.status(404).json({success: false}));
});


module.exports = router;