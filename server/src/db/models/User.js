const { model, Schema } = require('mongoose');
const {stringConfig} = require('./schemaConfig');

const UserSchema = new Schema({
  email:{
    ...stringConfig,
    min:5,
    max:30,
    unique:true
  },
  username:{
    ...stringConfig,
    min:3,
    max:30,
    unique:true
  },
  password:{
    ...stringConfig,
    min:8,
    max:30
  },
  displayName:{
    ...stringConfig,
    max:25
  },
  imageUrl:{
    ...stringConfig,
    default:'user.png'
  }
},{timestamps:true});

const Users = model('Users', UserSchema);

module.exports = Users;