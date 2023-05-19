require('dotenv').config();
require('express-async-errors')
const express = require('express');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const connectDB = require('./db/connect');
const app = express();
const products = require('./routes/products')


//*MiddleWares
app.use(express.json())


//!ROUTES
app.get('/', (req,res) =>{
    res.status(200).send(`<h1>Store API </h1><a href="/api/v1/products">Products</a>`)
})

app.use('/api/v1/products',products);
//!PRODUCT ROUTE

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000
const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URL, console.log("Connected to database"))
         app.listen(port, console.log(`Server is listing on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();
