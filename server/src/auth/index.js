const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const Users = require('../db/models/User');
const jwt = require('jsonwebtoken');

// Sign Up Joi Object
const signUpSchema = Joi.object({
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
    .alphanum()
    .required(),
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
  const payload = {
    id:user.id,
    username:user.username,
    role:user.role
  };
  jwt.sign(payload, process.env.JWTSECRET, {expiresIn:'1d'}, (error, token) => {
    if (error){
      console.log(error)
      res.status(500).json(error);
    } else {
      res.status(200).json({token:token});
    }
  })
}

router.get('/', (req,res) => {
  res.json({
    message:'Auth Route'
  })
});

// Sign up
router.post('/signup', async (req, res, next) => {
  try {
    const validBody = await signUpSchema.validateAsync(req.body);
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
        console.log(user);
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



module.exports = router;
