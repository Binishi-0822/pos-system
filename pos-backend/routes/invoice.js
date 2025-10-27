import express from 'express'
import { createInvoice, getAllInvoices } from '../controllers/invoiceController.js';
const router = express.Router()

router.post('/create-invoice', createInvoice)
router.get('/get-all-invoices', getAllInvoices)




export default router;
