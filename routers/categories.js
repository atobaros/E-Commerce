const express = require('express');
const router = express.Router();
const {Category} = require('../models/category');


router.get('/' , async (req , res)=>{
    const categoryList = await Category.find();

    if(!categoryList){
        res.status(500).json({success:false});
    }
    res.send(categoryList);
});

router.post('/', async (req , res) => {
    let category = new Category({
       name: req.body.name,
       color: req.body.color,
       icon: req.body.icon,
       image: req.body.image,

    })

    category = await category.save();

    if(!category)
    return res.status(404).send('the category cannot be created');

    res.send(category);

});

router.delete('/:id', (req,res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category){
            return res.status(200).json({success:true ,  message: 'the category has been deleted'});
        }else{
            return res.status(404).json({success:false ,  message: 'the category has not been found'});
        }
    }).catch((err)=>{
        return res.status(400).json({success:false ,  error: err});
    })
})

module.exports = router;