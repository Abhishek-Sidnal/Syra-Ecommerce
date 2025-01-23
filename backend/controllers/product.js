const Product = require('../models/Product');


exports.addProduct = async (req, res) => {
    const { name, description, price, stock, category } = req.body;

    if (!name || !description || !price || !stock || !category) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const product = new Product({
            userId: req.user.id, // Set the user ID from the authenticated user
            name,
            description,
            price,
            stock,
            category,
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
}


exports.editProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id }, // Check ownership
            req.body,
            { new: true } // Return the updated product
        );

        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: 'Error updating product', error: err.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id, userId: req.user.id }); // Check ownership

        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting product', error: err.message });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
}

exports.getUserProducts = async (req, res) => {
    try {
        const products = await Product.find({ userId: req.user.id }); // Find products by the logged-in user
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user products', error: err.message });
    }
}