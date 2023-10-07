import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: String,
  price: {
    type: Number,
  },
  // Reference to the Category to which the product belongs
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  // Reference to the Subcategory to which the product belongs (if applicable)
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Subcategories are also stored as Category objects
  },
  // Nested subcategories can be added here as an array
  nestedSubcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Subcategories are also stored as Category objects
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

export default Product;
