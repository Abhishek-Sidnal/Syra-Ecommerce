import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProducts, deleteProduct, editProduct } from '../features/products/productsSlice';
import EditProductForm from '../components/EditProductForm';

const MyProducts = () => {
    const dispatch = useDispatch();
    const { list: myProducts = [], status } = useSelector((state) => state.products);
    const [editingProduct, setEditingProduct] = useState(null);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchMyProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    const handleEdit = (id) => {
        const product = myProducts.find((prod) => prod._id === id);
        setEditingProduct(product);
    };

    const handleSave = (updatedData) => {
        dispatch(editProduct({ id: editingProduct._id, updates: updatedData }));
        setEditingProduct(null);
    };

    const handleCancel = () => {
        setEditingProduct(null);
    };

    if (status === 'loading') {
        return <p className="text-center text-darkPrimary">Loading your products...</p>;
    }

    if (!user) {
        return <p className="text-center text-darkDanger">Please login to view your products</p>;
    }

    return (
        <div className="bg-darkBg text-darkText min-h-screen p-6">
            <h2 className="text-2xl font-bold text-darkPrimary mb-6 text-center">My Products</h2>

            {myProducts.length === 0 ? (
                <p className="text-center text-gray-400">You have not added any products yet.</p>
            ) : (
                <div className="max-w-4xl mx-auto">
                    <ul className="space-y-4">
                        {myProducts.map((product) => (
                            <li
                                key={product._id}
                                className="p-4 bg-darkCard rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                            >
                                {editingProduct && editingProduct._id === product._id ? (
                                    <EditProductForm
                                        product={editingProduct}
                                        onSave={handleSave}
                                        onCancel={handleCancel}
                                    />
                                ) : (
                                    <>
                                        <h3 className="font-bold text-lg text-darkPrimary">{product.name}</h3>
                                        <p className="text-sm md:text-base text-gray-300 mt-2">
                                            {product.description}
                                        </p>
                                        <p className="text-sm md:text-base mt-1">
                                            Price: <span className="font-semibold">${product.price}</span>
                                        </p>
                                        <p className="text-sm md:text-base mt-1">
                                            Stock: <span className="font-semibold">{product.stock}</span>
                                        </p>
                                        <p className="text-sm md:text-base mt-1">
                                            Category: <span className="font-semibold">{product.category}</span>
                                        </p>
                                        <div className="flex space-x-4 mt-4">
                                            <button
                                                onClick={() => handleEdit(product._id)}
                                                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors duration-200"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MyProducts;
