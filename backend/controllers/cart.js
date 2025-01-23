const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId == productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(400).json({ message: 'Error adding to cart', error: err });
    }
}

exports.deleteFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter((item) => item.productId != req.params.productId);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(400).json({ message: 'Error removing from cart', error: err });
    }
}

exports.getCartItems = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const totalValue = cart.items.reduce((total, item) => {
            return total + item.productId.price * item.quantity;
        }, 0);

        res.json({ items: cart.items, totalValue });
    } catch (err) {
        console.log(err);
        
        res.status(500).json({ message: 'Error fetching cart items', error: err });
    }
}