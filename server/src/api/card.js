const express = require('express');
const router = express.Router();

const Boards = require('../db/models/Boards');
const Lists = require('../db/models/List');
const Cards = require('../db/models/Card');

// create card
router.post('/create', async (req,res,next) => {
  try {
    const payload = {
      listId : req.body.listId,
      boardId: req.body.boardId,
      title: req.body.title,
      description: req.body.description,
      color: req.body.color || 'default'
    }
    // console.log()
    const createdCard = await Cards.create(payload);
    res.status(200).json({message:'Card Created!', status: 200, card:createdCard});
  } catch (error) {
    res.status(404);
    next(error);
  }
})

// update card

// delete card
router.delete('/delete/:id', async (req,res,next) => {
  // delete all cards in a list
  try {
    const deletedCards = await Cards.deleteMany({boardId: req.params.id});
    res.status(200).json(deletedCards);
  } catch (error) {
    next(error)
  }
})
module.exports = router;