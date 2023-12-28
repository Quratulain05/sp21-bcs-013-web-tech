let mongoose = require('mongoose');

let modelSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
let Product = mongoose.model('Product', modelSchema);
module.exports = Product;
// module.exports.Product = Product;
