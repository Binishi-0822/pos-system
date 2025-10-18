import express from 'express'
import {addProduct, updateProduct, getAllProducts} from '../controllers/productController.js';

const router = express.Router()

router.post('/add-product', addProduct)
router.post('/update-product', updateProduct)
router.get('/get-products', getAllProducts)


export default router;
