const { model, Schema } = require('mongoose');
const {stringConfig} = require('./schemaConfig');

const BoardSchema = new Schema({
  name:stringConfig,
  background:{
    ...stringConfig,
    default:''
  },
  ownerId:{
    type: Schema.Types.ObjectId,
    ref:'Users'
  },
  memberIds:[{
    type: Schema.Types.ObjectId,
    ref:'Users'
  }],

},{timestamps:true});

const Boards = model('Boards',BoardSchema);

module.exports = Boards;