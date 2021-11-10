const express = require('express');
const app = express();
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose');

const api = process.env.API_URL;
const productsRouter = require('./routers/products');

//middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`, productsRouter);


mongoose.connect(process.env.CONNECTION)
.then(()=>{  
console.log('connection successfuly');
}).catch((err)=>{
console.log(err);
})


app.listen(3000, ()=>{
  console.log(api);  
  console.log('server is running http://localhost:3000');
})