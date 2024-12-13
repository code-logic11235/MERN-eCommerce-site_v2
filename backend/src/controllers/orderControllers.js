import catchAsyncErrors from '../middlewares/catchAsyncErrors.js'
import Order from "../models/order.js"
import Product from '../models/products.js';
import ErrorHandler from '../utils/errorHandler.js';

//create new order => /api/orders/new

export const newOrder = catchAsyncErrors(async (req, res, next) =>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
        user: req.user._id
    });
    res.status(200).json({
        order
    })
})
//get order details => /api/order/:id
export const getOrderDetails = (catchAsyncErrors(async (req, res, next)=>{
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if(!order){
        return next(new ErrorHandler("no order found with ID", 404)); 
    }
    res.status(200).json({
        order
    })
}))

//get current user orders => /api/me/orders
export const getCurrentUserOrder = (catchAsyncErrors(async (req, res, next)=>{
    const order = await Order.find({user: req.user._id}).populate("user", "name email") //returns the user model in response, in our case the naem adn email field relating to the oder
    if(!order){
        return next(new ErrorHandler("no order found with ID", 404)); 
    }
    res.status(200).json({
        order
    })
}))

// ADMIN get all order => api/admin/orders
export const getAllOrders = (catchAsyncErrors(async (req, res, next)=>{
    const order = await Order.find({});
    if(!order){
        return next(new ErrorHandler("cant find any orders?", 404)); 
    }
    res.status(200).json({
        order
    })
}))

// ADMIN updateOrder => api/admin/orders
export const updateOrder = (catchAsyncErrors(async (req, res, next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("no order found with ID", 404)); 
    }
    if(order?.orderStatus === "Delivered"){
        return next(new ErrorHandler("Ordered already delivered", 400)); 
    }

    // Update products stock. taking one away when deliver, we can also impliment it when we ccreate an order up there too
    order?.orderItems?.forEach(async (item) => {
        const product = await Product.findById(item?.product?.toString());
        if (!product) {
        return next(new ErrorHandler("No Product found with this ID", 404));
        }
        product.stock = product.stock - item.quantity;
        await product.save({ validateBeforeSave: false }); // because we have validations in product model, this flag simply skips thsoe validation
    });

    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();

    await order.save();



    res.status(200).json({
        order
    })
}))

// ADMIN delete order => api/admin/orders:id
export const deleteOrder = (catchAsyncErrors(async (req, res, next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("no order found with that ID", 404)); 
    }
    await order.deleteOne();

    res.status(200).json({
        success: true
    })
}))