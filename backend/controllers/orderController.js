const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleWares/CatchAsyncError");

//create nwe order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    texPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    texPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    message: "Order placed successfully",
    order,
  });
});

//getSingleOrder

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in user orders(myOrders)
exports.myOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new ErrorHandler("no order placed at", 404));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

//get all orders-- Admin
exports.getallOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();
  if (!orders) {
    return next(new ErrorHandler("no order placed at", 404));
  }
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//update order Status-- Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if ((order.orderStatus = "Delivered")) {
    return next(new ErrorHandler("you have delivered this product", 400));
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });
  order.orderStatus = req.body.status;
  if ((req.body.status = "Delivered")) {
    order.deliveredAt = Date.now();
  }
  await order.save({validateBeforeSave:false})
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity){
  const product = await Product.findById(id);

  product.stock -=quantity;
  await product.save({ validateBeforeSave:false})

}

//delete order -- admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find(req.params.id);
  if (!orders) {
    return next(new ErrorHandler("no order placed at", 404));
  }
 order.remove()
  res.status(200).json({
    success: true,
    
  });
});