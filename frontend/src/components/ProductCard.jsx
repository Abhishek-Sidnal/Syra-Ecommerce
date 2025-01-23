import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { addToWishlist } from '../features/wishlist/wishlistSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product._id));
  };

  return (
    <div className="bg-darkCard p-4 rounded-lg shadow-md text-darkText hover:shadow-lg transition-shadow duration-300">
      <h3 className="font-bold text-lg text-darkPrimary mb-2">{product.name}</h3>
      <p className="text-sm md:text-base mb-2">{product.description}</p>
      <p className="font-semibold text-darkSecondary mt-2">
        Price: <span className="text-white">₹ {product.price}</span>
      </p>
      <p className="text-sm text-gray-400 mt-1">Stock: {product.stock}</p>
      <p className="text-sm text-gray-400 mt-1">Category: {product.category}</p>

      <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4 space-y-4 sm:space-y-0">
        <button
          onClick={handleAddToCart}
          className="bg-darkPrimary text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors duration-200 w-full sm:w-auto"
        >
          Add to Cart
        </button>

        <button
          onClick={handleAddToWishlist}
          className="bg-darkSecondary text-white px-4 py-2 rounded hover:bg-teal-500 transition-colors duration-200 w-full sm:w-auto"
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
