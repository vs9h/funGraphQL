const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardSchema = new Schema({
  title: String,
  description: String,
  isAdded: Boolean,
  collectionsId: [Schema.Types.ObjectId],
});
module.exports = mongoose.model('card', cardSchema, 'cards');
