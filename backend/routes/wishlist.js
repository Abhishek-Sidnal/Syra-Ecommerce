const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addWishlist, deleteWishlist, getWishlists } = require('../controllers/wishlist');

const router = express.Router();

router.post('/', authMiddleware, addWishlist);

router.delete('/:productId', authMiddleware, deleteWishlist);

router.get('/', authMiddleware, getWishlists);

module.exports = router;
