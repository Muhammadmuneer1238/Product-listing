// client/src/components/ProductListing.js
import React, { useEffect, useState } from 'react';

const ProductListing = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get('/api/categories').then((response) => {
      setCategories(response.data);
    });
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  }

  return (
    <div>
      <h2>Product Listing</h2>
      <label>Select Category:</label>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <h3>Total Number of Products: {/* Display total number of products */}</h3>
      <div>
      <h4>List of Subcategories:</h4>
        <ul>
          {subcategories.map((subcategory) => (
            <li key={subcategory._id}>
              {subcategory.name} ({subcategory.productCount} products)
            </li>
          ))}
        </ul>
      </div>
      <ul>
        {/* List of Products */}
      </ul>
    </div>
  );
};

export default ProductListing;
