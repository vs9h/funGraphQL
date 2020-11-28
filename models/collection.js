const mongoose = require('mongoose');

const { Schema } = mongoose;

const collectionSchema = new Schema({
  title: String,
  description: String,
  isAdded: Boolean,
  length: Number,
});
module.exports = mongoose.model('collection', collectionSchema, 'collections');
