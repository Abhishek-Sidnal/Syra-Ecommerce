import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { list: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <p className="text-center text-darkPrimary mt-6">Loading products...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center text-darkDanger mt-6">Failed to load products.</p>;
  }

  return (
    <div className="bg-darkBg text-darkText min-h-screen px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl md:text-3xl font-bold text-darkPrimary mb-8 text-center">
        All Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          No products available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
