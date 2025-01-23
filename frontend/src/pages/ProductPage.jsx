import React from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/products/productsSlice';
import ProductForm from '../components/ProductForm';

const ProductPage = () => {
  const dispatch = useDispatch();

  const handleProductSubmit = (formData) => {
    dispatch(addProduct(formData));
    alert('Product added successfully!');
  };

  return (
    <div className="bg-darkBg text-darkText min-h-screen p-6">
      <h2 className="text-2xl font-bold text-darkPrimary mb-6">Add New Product</h2>
      <ProductForm onSubmit={handleProductSubmit} />
    </div>
  );
};

export default ProductPage;
