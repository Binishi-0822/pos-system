import express from 'express';
import {
  createCustomer,
  updateCustomer,
  getCustomers,
  getCustomerById,
  deleteCustomer
} from '../controllers/customerController.js';

const router = express.Router();

router.post('/add-customer', createCustomer);
router.post('/update-customer', updateCustomer);
router.get('/get-customers', getCustomers);
router.get('/get-customer/:id', getCustomerById);
router.post('/delete-customer', deleteCustomer);

export default router;
