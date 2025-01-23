const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { addProduct, editProduct, deleteProduct, getAllProducts, getUserProducts } = require('../controllers/product');

const router = express.Router();

router.post('/', authMiddleware, addProduct);

router.put('/:id', authMiddleware, editProduct);

router.delete('/:id', authMiddleware, deleteProduct);

router.get('/', getAllProducts);

router.get('/my-products', authMiddleware, getUserProducts);


module.exports = router;
