const Product = require('../models/productModel');
const ErrorHandlor = require('../utils/errorHandler');

const catchAsyncError = require('../middleWares/CatchAsyncError');
const ApiFeature = require('../utils/apiFeature');

//create Product -- Admin
exports.createProduct= catchAsyncError(
    async(req, res, next) =>{
        const product = await Product.create(req.body);
    
        res.status(200).json({
            success:true,
            product
        })
    }
)

//get all products

exports.getAllProducts = catchAsyncError(
    
    async(req, res)=>{
        const resultPerPage = 5;
        const productCount = await Product.countDocuments()
        const apiFeature = new ApiFeature(Product.find(), req.query).search().filter().pagination(resultPerPage)

        const products = await apiFeature.query;
    
        res.status(200).json({
            success:true,
            products,
            productCount,
        })
    }
)

//update product --ADMIN
exports.updateProduct = catchAsyncError(
    async(req, res, next)=>{
    
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
)

//delete product

exports.deleteProduct = catchAsyncError(
    async(req, res, next)=>{
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
)

//get single product details
exports.getProduct= catchAsyncError(
    async(req, res, next)=>{
        let product = await Product.findById(req.params.id);
    
        if(!product){
            return next(new ErrorHandlor("product not found", 404))
        }
        res.status(200).json({
            success:true,
            product
        })
    }
) 