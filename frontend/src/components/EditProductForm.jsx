import React, { useState } from 'react';

const EditProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); 
  };

  return (
    <form onSubmit={handleSubmit} className="bg-darkCard p-6 rounded shadow-lg text-darkText">
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-darkBg text-darkText border border-darkPrimary"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 rounded bg-darkBg text-darkText border border-darkPrimary"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 rounded bg-darkBg text-darkText border border-darkPrimary"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full p-2 rounded bg-darkBg text-darkText border border-darkPrimary"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 rounded bg-darkBg text-darkText border border-darkPrimary"
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-darkPrimary text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-darkDanger text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
