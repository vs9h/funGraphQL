const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardSchema = new Schema({
  title: String,
  description: String,
  collectionId: Schema.Types.ObjectId,
  isAdded: Boolean,
});
module.exports = mongoose.model('card', cardSchema, 'cards');
