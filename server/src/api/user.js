const express = require('express');
const router = express.Router();
const Users = require('../db/models/User');

// return users data
router.get('/', async (req, res, next) => {
  res.json(req.user || {message:'no user'});
});


// find user

// update user

// delete user


module.exports = router;