import express from 'express'
import {addProduct, updateProduct, getProducts, deleteProduct, getInventorySummary} from '../controllers/productController.js';

const router = express.Router()

router.post('/add-product', addProduct)
router.post('/update-product', updateProduct)
router.get('/get-products/:id?', getProducts)
router.get('/get-inventory-summary', getInventorySummary)
router.post('/delete-product', deleteProduct)


export default router;
