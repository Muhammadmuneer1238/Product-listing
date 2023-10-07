import React, { useState, useEffect } from 'react';
import{Link } from 'react-router-dom'

const apiUrl = 'https://backend-g9fq.onrender.com/server/product';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [nestedSubcategories, setNestedSubcategories] = useState([]);
  const [selectedNestedSubcategory, setSelectedNestedSubcategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(apiUrl + '/add'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Error fetching categories:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedSubcategory) {
      const selectedCategoryObject = subcategories.find(
        (subcategory) => subcategory._id === selectedSubcategory
      );

      setNestedSubcategories(
        selectedCategoryObject ? selectedCategoryObject.subcategories : []
      );
    } else {
      setNestedSubcategories([]);
    }
  }, [selectedSubcategory, subcategories]);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategory(selectedCategoryId);

    const selectedCategoryObject = categories.find(
      (category) => category._id === selectedCategoryId
    );

    setSubcategories(
      selectedCategoryObject ? selectedCategoryObject.subcategories : []
    );
    setSelectedSubcategory('');
    setNestedSubcategories([]);
    setSelectedNestedSubcategory('');
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
    setSelectedNestedSubcategory('');
  };

  const handleNestedSubcategoryChange = (e) => {
    setSelectedNestedSubcategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl +'/addProduct', {
       
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: productName,
          description: productDescription,
          price: productPrice,
          category: selectedCategory,
          subcategory: selectedSubcategory,
          nestedSubcategory: selectedNestedSubcategory,
        }),
      });

      if (response.ok) {
        console.log(response);
        alert('Product created successfully');
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setSelectedCategory('');
        setSelectedSubcategory('');
        setSelectedNestedSubcategory('');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Product Name:
          </label>
          <input
            type="text"
            value={productName}
            onChange={handleProductNameChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Product Description:
          </label>
          <textarea
            value={productDescription}
            onChange={handleProductDescriptionChange}
            className="w-full px-3 py-2 border rounded-lg"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Product Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={handleProductPriceChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Category:</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {subcategories.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Subcategory:</label>
            <select
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select a subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {nestedSubcategories.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Nested Subcategory:</label>
            <select
              value={selectedNestedSubcategory}
              onChange={handleNestedSubcategoryChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select a nested subcategory</option>
              {nestedSubcategories.map((nestedSubcategory) => (
                <option key={nestedSubcategory._id} value={nestedSubcategory._id}>
                  {nestedSubcategory.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Create Product
          </button>
        </div>
      </form>
      <Link to="/addcategory">
        <button className="m-3 bg-green-600 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Add category
        </button>
      </Link>
      <Link to="/">
        <button className="m-3 bg-green-600 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Product view
        </button>
      </Link>
    </div>
  );
}

export default AddProduct;
