const express = require('express');
const router = express.Router();
const {Product} = require('../models/product');


router.get(`/` , async (req,res)=>{
    const productList = await Product.find();
    res.send(productList);
})


router.post(`/` , (req,res)=>{
    const product = new Product({
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

    product.save().then((createdProduct=>{
        res.status(201).json(createdProduct)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success:false
        })

    })
    
})

module.exports = router;