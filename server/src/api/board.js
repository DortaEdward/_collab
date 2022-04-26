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
});

// add user to board
router.put('/add/:id', async (req,res,next) => {
  const boardId = req.params.id;
  const userId = req.body.userId;
  const foundBoard = await Boards.findById(boardId);
  if(!foundBoard.memberIds.includes(userId)){
    await foundBoard.updateOne({
      $push:{
        memberIds: userId
      }
    });
    res.status(200).json({Message:'User Added',Board:foundBoard});
  } else{
    const error = new Error('User already a member on the board');
    res.status(401);
    next(error);
  };
});

// remove user to board
router.put('/remove/:id', async (req,res,next) => {
  const boardId = req.params.id;
  const userId = req.body.userId;
  const foundBoard = await Boards.findById(boardId);
  if(foundBoard.memberIds.includes(userId)){
    await foundBoard.updateOne({
      $pull:{
        memberIds: userId
      }
    });
    res.status(200).json({Message:'User Removed',Board:foundBoard});
  } else{
    const error = new Error('User not a member on the board');
    res.status(401);
    next(error);
  };
});

// delete board
router.delete('/delete/:id', async (req,res,next) => {
  // find board
  const bodyId = req.params.id;
  try {
    await Boards.findByIdAndDelete(bodyId);
    res.status(200).json({Message:'Board Deleted'});
  } catch (error) {
    next(error);
  }
})


module.exports = router;