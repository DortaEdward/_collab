const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Users = require('../db/models/User');
const jwt = require('jsonwebtoken');

// Register Joi Object
const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .min(8)
    .max(30)
    .required(),
  displayName: Joi.string()
    .alphanum()
    .max(25)
    .required(),
  imageUrl: Joi.string()
});

// Log In Joi Object
const logInSchema = Joi.object({
  username: Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required(),
  password: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  .min(8)
  .max(30)
  .required(),
});

function createJWT(user,res){
  delete user._doc.password;
  delete user._doc.createdAt;
  delete user._doc.updatedAt;
  delete user._doc.__v;
  const payload = {...user._doc};
  jwt.sign(payload, process.env.JWTSECRET, {expiresIn:'1d'}, (error, token) => {
    if (error){
      console.log(error)
      res.status(500).json(error);
    } else {
      res.status(200).json({token:token});
    }
  })
}

router.get('/', async (req,res) => {
  const users = await Users.find();
  res.json({
    message:users
  })
});

// Register
router.post('/register', async (req, res, next) => {
  try {
    const validBody = await registerSchema.validateAsync(req.body);
    if(validBody){
      const userData = req.body;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      userData.password = bcrypt.hashSync(userData.password, salt);
      const user = await Users.create(userData);
      await user.save();
      delete user._doc.password;
      res.status(200).json({message:'User Created'});
    } else{
      const err = new Error('Invalid Values');
      next(err);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
})

// Log in
router.post('/login', async (req, res, next) => {
  try {
    const valid = await logInSchema.validateAsync(req.body);
    if(valid){
      const {username, password} = req.body;
      const user = await Users.findOne({username:username});
      const validPassword = bcrypt.compareSync(password, user.password);
      if(validPassword){
        delete user._doc.password;
        createJWT(user,res);
      }else{
        const err = new Error('Invalid Credentials');
        next(err);
      }
    } else{
      const err = new Error('Invalid Credentials');
      next(err);
    }
  } catch (error) {
    next(error);
  }
})

router.get('/logout/:id', async (req,res,next) => {
  if(req.params.id === req.user.id){
    delete req.user;
  } else{
    next();
  }
})



module.exports = router;
