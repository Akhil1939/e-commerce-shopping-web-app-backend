const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const catchAsyncError = require("../middleWares/CatchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail')

//Register new user

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample id",
      url: "sample url",
    },
  });
  sendToken(user, 201, res)

});

//login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("please enter email & password"), 400);
  }

  const user = await User.findOne({
    email,
  }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email & password"), 401);
  }

  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email & password"), 401);
  }

 sendToken(user, 200, res)
});

//logout

exports.logout = catchAsyncError(
  async(req, res, next)=>{

    res.cookie("token", null,{
      expires:new Date(Date.now()),
      HttpOnly:true
    })

    res.status(200).json({
      success:true,
      message:"logeed out successful"
    })
  }
)

//forgot password
exports.forgotPassword = catchAsyncError(async(req, res, next)=>{
  const user = await User.findOne({email:req.body.email});

  if(!user){
    return next(new ErrorHandler("user not found"), 404)
  }

  //get reset password token
 const resetToken = user.getResetPasswordToken()

 await user.save({validateBeforeSave:false});

 const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

 const message = `your password reset token is :- \n\n ${ resetPasswordUrl} \n\n if you have not registered this email then , please Ignored it `; 
 try{

  await sendEmail({
    email:user.email,
    subject:"E-commerce password recovery",
    message,

  })
  res.status(200).json({
    success:true,
    message:`Email sent to ${user.email} successfully`,
  })
 }catch(error){
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({validateBeforeSave:false});

  return next(new ErrorHandler(error.message, 500))


 }
})