const Product = require('../models/productModel');
const ErrorHandlor = require('../utils/errorHandler');

//create Product -- Admin
exports.createProduct= async(req, res, next) =>{
    const product = await Product.create(req.body);

    res.status(200).json({
        success:true,
        product
    })
}

//get all products

exports.getAllProducts = async(req, res, next)=>{
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    })
}

//update product --ADMIN
exports.updateProduct = async(req, res, next)=>{
    
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandlor("product not found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true, useFindAndModify:false});

    res.status(200).json({
        success:true,
        product
    })
}

//delete product

exports.deleteProduct = async(req, res, next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandlor("product not found", 404))
        
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"product deleted successful"
    })

}

//get single product details
exports.getProduct= async(req, res, next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandlor("product not found", 404))
    }
    res.status(200).json({
        success:true,
        product
    })
}