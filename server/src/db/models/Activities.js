const { model, Schema } = require('mongoose');

const BoardSchema = new Schema({

});

const Board = model('Board',BoardSchema);

module.exports = Board;