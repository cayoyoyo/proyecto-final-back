const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  favoriteProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  productsForSale: []
});

module.exports = mongoose.model('User', userSchema);
