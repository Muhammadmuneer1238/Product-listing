import mongoose from "mongoose";

// Subcategory schema
const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subcategories: [mongoose.Schema.Types.Mixed], // Use Mixed type for nested objects
});

// Category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subcategories: [subcategorySchema], // Reference the subcategory schema
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
