const express = require('express');
const router = express.Router();

const Boards = require('../db/models/Boards');
const Lists = require('../db/models/List');

router.post('/create/:id', async (req,res,next) => {
  try {
    const board = await Boards.findById(req.params.id);
    if(board){
      const createdList = await Lists.create({
        name:req.body.name,
        boardId:req.params.id
      });
      res.status(200).json(createdList);
    } else{
      const error = new Error('Board Does Not Exist');
      res.status(404);
      next(error);
    }
  } catch (error) {
    next(error);
  }
})


module.exports = router;