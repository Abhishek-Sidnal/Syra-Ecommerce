const Wishlist = require('../models/Wishlist');

exports.addWishlist = async (req, res) => {
    const { productId } = req.body;
    try {
        let wishlist = await Wishlist.findOne({ userId: req.user.id });
        if (!wishlist) {
            wishlist = new Wishlist({ userId: req.user.id, items: [] });
        }

        if (!wishlist.items.includes(productId)) {
            wishlist.items.push(productId);
        }

        await wishlist.save();
        res.json(wishlist);
    } catch (err) {
        res.status(400).json({ message: 'Error adding to wishlist', error: err });
    }
}




exports.deleteWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.user.id });
        if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

        wishlist.items = wishlist.items.filter((item) => item != req.params.productId);
        await wishlist.save();
        res.json(wishlist);
    } catch (err) {
        res.status(400).json({ message: 'Error removing from wishlist', error: err });
    }
}


exports.getWishlists = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('items');
        if (!wishlist) return res.status(404).json({ message: 'Wishlist is empty.' });

        res.json(wishlist.items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching wishlist items.', error: err.message });
    }
}