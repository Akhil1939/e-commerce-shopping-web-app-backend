const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required : [true, "Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required : [true, "Please Enter Product Description"]
    },
    price:{
        type:Number,
        required : [true, "Please Enter Product Price"],
        maxLength:[8, "price can not exceed 8 character"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }

    ],
    category:{
        type:String,
        required : [true, "Please Enter Product category"],
        
    },
    stock:{
        type:Number,
        required : [true, "Please Enter Product Stock"],
        maxLength:[4, "Stock can not exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                require:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    }

}, {timestamps:true})

module.exports= mongoose.model('Product', productSchema)