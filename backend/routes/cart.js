const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addToCart, deleteFromCart, getCartItems } = require('../controllers/cart');

const router = express.Router();

router.post('/', authMiddleware, addToCart);

router.delete('/:productId', authMiddleware, deleteFromCart);

router.get('/', authMiddleware, getCartItems);


module.exports = router;
