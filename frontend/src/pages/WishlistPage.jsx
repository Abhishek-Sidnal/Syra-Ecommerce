import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../features/wishlist/wishlistSlice';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  if (status === 'loading') return <p>Loading your wishlist...</p>;
  if (status === 'failed') return <p>Failed to load wishlist items.</p>;

  return (
    <div className="bg-darkBg text-darkText min-h-screen p-6">
      <h2 className="text-2xl font-bold text-darkPrimary mb-6">Your Wishlist</h2>
      {items.length === 0 ? (
        <p className="text-center text-gray-400">Your wishlist is empty.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item._id} className="p-4 bg-darkCard rounded shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg text-darkPrimary">{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: ₹ {item.price}</p>
                  <p>Category: {item.category}</p>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-darkDanger hover:underline"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
