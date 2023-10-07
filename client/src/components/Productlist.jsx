import React, { useState, useEffect } from 'react';

const ProductCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedSubcategory, setSelectedSubcategory] = useState({});
  const [selectedNestedSubcategory, setSelectedNestedSubcategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let apiUrl = 'http://localhost:3000/server/product';

    fetch(apiUrl + '/add')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  // Fetch products when the user selects a category, subcategory, or nested subcategory
  useEffect(() => {
    if (selectedCategory && !loading) {
      // Construct the API URL with query parameters based on the selected categories
      let apiUrl =
        'http://localhost:3000/server/product/products?category=' +
        selectedCategory._id;

      // If a subcategory is selected, add it to the query
      if (selectedSubcategory && selectedSubcategory._id) {
        apiUrl += '&subcategory=' + selectedSubcategory._id;
      }

      // If a nested subcategory is selected, add it to the query
      if (selectedNestedSubcategory && selectedNestedSubcategory._id) {
        apiUrl += '&nestedSubcategory=' + selectedNestedSubcategory._id;
      }

      // Fetch products from the API
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Update the products state with the fetched data
          setProducts(data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, [selectedCategory, selectedSubcategory, selectedNestedSubcategory, loading]);

  // Define functions to handle category, subcategory, and nested subcategory selections
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory({});
    setSelectedNestedSubcategory({});
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setSelectedNestedSubcategory({});
  };

  const handleNestedSubcategorySelect = (nestedSubcategory) => {
    setSelectedNestedSubcategory(nestedSubcategory);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Product Categories</h1>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => handleCategorySelect(category)}
            className={`p-2 border rounded-lg cursor-pointer ${
              selectedCategory && selectedCategory._id === category._id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {category.name}
          </div>
        ))}
      </div>
      {selectedCategory && !loading && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">
            Subcategories of {selectedCategory.name}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {selectedCategory.subcategories &&
              selectedCategory.subcategories.map((subcategory) => (
                <div
                  key={subcategory._id}
                  onClick={() => handleSubcategorySelect(subcategory)}
                  className={`p-2 border rounded-lg cursor-pointer ${
                    selectedSubcategory && selectedSubcategory._id === subcategory._id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {subcategory.name}
                </div>
              ))}
          </div>
        </div>
      )}
      {selectedSubcategory && !loading && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">
            Nested Subcategories of {selectedSubcategory.name}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {selectedSubcategory.subcategories &&
              selectedSubcategory.subcategories.map((nestedSubcategory) => (
                <div
                  key={nestedSubcategory._id}
                  onClick={() => handleNestedSubcategorySelect(nestedSubcategory)}
                  className={`p-2 border rounded-lg cursor-pointer ${
                    selectedNestedSubcategory &&
                    selectedNestedSubcategory._id === nestedSubcategory._id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {nestedSubcategory.name}
                </div>
              ))}
          </div>
        </div>
      )}
      {selectedNestedSubcategory && !loading && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">
            Products in {selectedNestedSubcategory.name}
          </h2>
          {Array.isArray(products) && products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <li
                  key={product._id}
                  className="mb-2 p-2 border rounded-lg bg-white shadow-md"
                >
                  {product.name} - {product.description} - ${product.price}
                </li>
              ))}
            </ul>
          ) : (
            <p>No products available for this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCategoryPage;
