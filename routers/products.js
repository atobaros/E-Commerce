const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const {Product} = require('../models/product');


router.get(`/` , async (req,res)=>{
    let productList = await Product.find();
    
    if(!productList){
        res.status(500).send('there are not products');
    }
    
    res.send(productList);
}),

router.get(`/:id` , async (req,res)=>{
    try{
    let product = await Product.findById(req.params.id);
    if(!product){
        res.status(500).json({success:false});
    }
    res.send(product);
}catch(err){
    res.status(500).json({success:false, error:err});
}
})


router.post(`/` , async (req,res)=>{
    let category = await Category.findById(req.body.category);
    if(!category)
    return res.status(400).send('invalid category');

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        raiting: req.body.raiting,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated
    })
    
    product = await product.save();
    if(!product)
    return res.status(500).send('the product cannot be created');

    res.send(product);
    
})

module.exports = router;