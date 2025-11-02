import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import metaDataRouter from './routes/metaData.js'
import productRouter from './routes/product.js'
import invoiceRouter from './routes/invoice.js'
import customerRouter from './routes/customer.js'
import dotenv from 'dotenv';
import connectToDatabase from './db/db.js';
import { startInactiveCustomerJob } from './jobs/inactiveCustomerJob.js'

dotenv.config();
connectToDatabase()
const app = express();
app.use(cors())
app.use(express.json())
startInactiveCustomerJob();

app.use('/api/auth',authRouter)
app.use('/api/meta-data',metaDataRouter)
app.use('/api/product',productRouter)
app.use('/api/invoice',invoiceRouter)
app.use('/api/customer',customerRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`)
})