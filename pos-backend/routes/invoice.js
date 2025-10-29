import express from 'express'
import { createInvoice, getAllInvoices, updateInvoice } from '../controllers/invoiceController.js';
const router = express.Router()

router.post('/create-invoice', createInvoice)
router.get('/get-all-invoices', getAllInvoices)
router.put("/invoices/:id", updateInvoice);




export default router;
