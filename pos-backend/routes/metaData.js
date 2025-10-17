import express from 'express'
import {getAllCategories,getAllMeasurement} from '../controllers/metaDataController.js';

const router = express.Router()

router.get('/categories', getAllCategories)
router.get('/measurements', getAllMeasurement)


export default router;
