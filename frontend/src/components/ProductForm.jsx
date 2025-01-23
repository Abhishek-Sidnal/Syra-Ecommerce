import React, { useState } from 'react';

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    stock: initialData.stock || '',
    category: initialData.category || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', description: '', price: '', stock: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-darkCard p-6 rounded shadow-lg text-darkText w-full max-w-md">
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-darkBg text-darkText border border-darkPrimary"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 rounded bg-darkBg text-darkText border border-darkPrimary"
          required
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
          required
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
          required
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
          required
        />
      </div>
      <button
        type="submit"
        className="bg-darkPrimary text-white px-4 py-2 rounded hover:bg-purple-600 w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
