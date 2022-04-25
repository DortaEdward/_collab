const { model, Schema } = require('mongoose');
const {stringConfig} = require('./schemaConfig');

// Need to add Priority
const CardSchema = new Schema({
  listId:{
    type: Schema.Types.ObjectId,
    ref:'Lists'
  },
  boardId:{
    type: Schema.Types.ObjectId,
    ref:'Boards'
  },
  title:stringConfig,
  description:stringConfig,
  order:{
    type:Number,
    required:true,
    default:0
  },
  archived:{
    type:Boolean,
    default:false,
    required:true
  },
  memberIds:[{
    type: Schema.Types.ObjectId,
    ref:'Users'
  }],
  color:{
    type:String,
    default:''
  }
}, {timestamps:true});

const Cards = model('Cards',CardSchema);

module.exports = Cards;