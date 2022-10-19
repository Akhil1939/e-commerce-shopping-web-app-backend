const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncError = require("./CatchAsyncError");
const jwt = require('jsonwebtoken');
const user = require("../models/userModel");

exports.isAuthenticatedUser = CatchAsyncError(
    async (req, res, next)=>{
        const {token} = await req.cookies;
        // console.log(token);

    if(!token){
        return next(new ErrorHandler("Please Login in to access  this resource"), 401);
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = await user.findById(decodedData.id);
    next();


 
    }
)

exports.authorizeRoles = (...roles) =>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return(

                new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 403)
                
                )
        }
        next();
    }
} 