const { model, Schema } = require('mongoose');
const {stringConfig} = require('./schemaConfig');

const ListSchema = new Schema({
  name:stringConfig,
  boardId:{
    type: Schema.Types.ObjectId,
    ref:'Boards'
  },
  order:{
    type:Number,
    required:true,
    default:0
  },
  archived:{
    type:Boolean,
    default:false,
    required:true
  }
},{timestamps:true});

const Lists = model('Lists',ListSchema);

module.exports = Lists;