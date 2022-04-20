const express = require('express');
const router = express.Router();
const Users = require('../db/models/User');

// find user

// update user

// delete user

router.get('/', async (req, res, next) => {
  res.json({
    message:'User route'
  })
});

module.exports = router;