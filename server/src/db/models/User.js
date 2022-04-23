const { model, Schema } = require('mongoose');
const {stringConfig} = require('./schemaConfig');

const UserSchema = new Schema({
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
  }
},{timestamps:true});

const Users = model('Users', UserSchema);

module.exports = Users;