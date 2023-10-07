import React, { useState } from 'react';
import { Link } from 'react-router-dom';
let apiUrl="https://product-listing-h25u.onrender.com"
function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState('');

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubcategoryNameChange = (e) => {
    setSubcategoryName(e.target.value);
  };

  const handleAddSubcategory = () => {
    if (subcategoryName.trim() === '') {
      return;
    }

    const newSubcategory = {
      name: subcategoryName,
      subcategories: [],
    };

    setSubcategories([...subcategories, newSubcategory]);
    setSubcategoryName('');
  };

  const handleAddNestedSubcategory = (index) => {
    if (subcategoryName.trim() === '') {
      return;
    }

    const updatedSubcategories = [...subcategories];
    const newSubcategory = {
      name: subcategoryName,
      subcategories: [],
    };
    updatedSubcategories[index].subcategories.push(newSubcategory);
    setSubcategories(updatedSubcategories);
    setSubcategoryName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl + '/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName, subcategories }),
      });

      if (response.ok) {
        alert('Category created successfully');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const removeSubcategory = (index) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories.splice(index, 1);
    setSubcategories(updatedSubcategories);
  };

  const removeNestedSubcategory = (parentIndex, nestedIndex) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories[parentIndex].subcategories.splice(nestedIndex, 1);
    setSubcategories(updatedSubcategories);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={handleCategoryNameChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Subcategories:</label>
          {subcategories.map((subcat, index) => (
            <div key={index} className="mb-2">
              <div className="flex mb-2">
                <input
                  type="text"
                  value={subcat.name}
                  readOnly
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeSubcategory(index)}
                  className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg"
                >
                  Remove
                </button>
              </div>
              <div className="mb-2">
                <label className="block font-semibold mb-2">Nested Subcategories:</label>
                {subcat.subcategories.map((nestedSubcat, nestedIndex) => (
                  <div key={nestedIndex} className="flex mb-2">
                    <input
                      type="text"
                      value={nestedSubcat.name}
                      readOnly
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeNestedSubcategory(index, nestedIndex)}
                      className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="flex">
                  <input
                    type="text"
                    value={subcategoryName}
                    onChange={handleSubcategoryNameChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddNestedSubcategory(index)}
                    className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Add Nested Subcategory
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex">
            <input
              type="text"
              value={subcategoryName}
              onChange={handleSubcategoryNameChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <button
              type="button"
              onClick={handleAddSubcategory}
              className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg"
            >
              Add Subcategory
            </button>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Create Category
          </button>
        </div>
      </form>
      <Link to="/addproduct">
        <button className="m-3 bg-green-600 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Add Product
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

export default AddCategory;
