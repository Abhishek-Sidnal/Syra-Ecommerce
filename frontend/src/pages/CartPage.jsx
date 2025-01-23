import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart } from '../features/cart/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items = [], status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  if (status === 'loading')
    return <p className="text-center text-darkPrimary">Loading your cart...</p>;
  if (status === 'failed')
    return <p className="text-center text-darkDanger">Failed to load cart items.</p>;

  return (
    <div className="bg-darkBg text-darkText min-h-screen p-6">
      <h2 className="text-2xl font-bold text-darkPrimary mb-6 text-center">
        Your Cart
      </h2>
      {items.length === 0 ? (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.productId._id}
                className="p-4 bg-darkCard rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-darkPrimary">
                      {item.productId.name}
                    </h3>
                    <p className="text-sm md:text-base mt-1">
                      Price: <span className="font-semibold">${item.productId.price}</span>
                    </p>
                    <p className="text-sm md:text-base mt-1">
                      Quantity: <span className="font-semibold">{item.quantity}</span>
                    </p>
                    <p className="text-sm md:text-base mt-1">
                      Total: <span className="font-semibold">${item.productId.price * item.quantity}</span>
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-4 flex sm:items-center">
                    <button
                      onClick={() => handleRemove(item.productId._id)}
                      className="text-darkDanger hover:text-red-600 underline font-medium transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold text-darkPrimary">
              Grand Total: $
              {items.reduce(
                (total, item) => total + item.productId.price * item.quantity,
                0
              )}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
