import express from 'express'
import {addProduct} from '../controllers/productController.js';

const router = express.Router()

router.post('/add-product', addProduct)


export default router;
