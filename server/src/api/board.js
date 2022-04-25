const express = require('express');
const router = express.Router();
const Boards = require('../db/models/Boards');


// get all users boards
router.get('/', async (req,res,next) => {
  try {
    const usersBoards = await Boards.find({
      ownerId:req.user._id
    });
    const boardsWithUser = await Boards.find({
      memberIds: [req.user._id]
    });
    res.status(200).json({
      userBoards: usersBoards,
      boardsWithUser: boardsWithUser
    });
  } catch (error) {
    next(error);
  }
})

// create board
router.post('/create', async (req,res,next) => {
  try {
    const {name, backgroundImg} = req.body;
    const createdBoard = await Boards.create({
      name: name,
      backgroundImg:backgroundImg,
      ownerId:req.user._id
    });
    res.status(200).json({message:'Board Created', board: createdBoard});
  } catch (error) {
    next(error);
  }
})


module.exports = router;