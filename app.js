const express = require('express');
const app = express();
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');


app.use(cors());
app.options('*',cors());

//middleware
app.use(express.json());
app.use(morgan('tiny'));


//Routers
const api = process.env.API_URL;
const productsRouter = require('./routers/products');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const usersRouter = require('./routers/users');
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);


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