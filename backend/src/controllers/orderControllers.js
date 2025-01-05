import catchAsyncErrors from '../middlewares/catchAsyncErrors.js'
import Order from "../models/order.js"
import Product from '../models/products.js';
import ErrorHandler from '../utils/errorHandler.js';

//create new order => /api/orders/new

export const newOrder = catchAsyncErrors(async (req, res, next) => {
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
export const getOrderDetails = (catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if (!order) {
        return next(new ErrorHandler("no order found with ID", 404));
    }
    res.status(200).json({
        order
    })
}))

//get current user orders => /api/me/orders
export const getCurrentUserOrder = (catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id }).populate("user", "name email") //returns the user model in response, in our case the naem adn email field relating to the oder
    if (!order) {
        return next(new ErrorHandler("no order found with ID", 404));
    }
    res.status(200).json({
        order
    })
}))

// ADMIN get all order => api/admin/orders
export const getAllOrders = (catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find({});
    if (!order) {
        return next(new ErrorHandler("cant find any orders?", 404));
    }
    res.status(200).json({
        order
    })
}))

// ADMIN updateOrder => api/admin/orders
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("No Order found with this ID", 404));
    }
  
    if (order?.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }
  
    let productNotFound = false;
  
    // Update products stock
    for (const item of order.orderItems) {
      const product = await Product.findById(item?.product?.toString());
      if (!product) {
        productNotFound = true;
        break;
      }
      product.stock = product.stock - item.quantity;
      await product.save({ validateBeforeSave: false });
    }
  
    if (productNotFound) {
      return next(
        new ErrorHandler("No Product found with one or more IDs.", 404)
      );
    }
  
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();
  
    await order.save();
  
    res.status(200).json({
      success: true,
    });
  });

// ADMIN delete order => api/admin/orders:id
export const deleteOrder = (catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("no order found with that ID", 404));
    }
    await order.deleteOne();

    res.status(200).json({
        success: true
    })
}))

// api for sales data 
// eventually return the date total sales amount and number o
// { date: '2024-12-06', sales: 0, numOrders: 0 },
// { date: '2024-12-07', sales: 0, numOrders: 0 },
// { date: '2024-12-08', sales: 0, numOrders: 0 },
// { date: '2024-12-09', sales: 0, numOrders: 0 },
// { date: '2024-12-10', sales: 0, numOrders: 0 },
// { date: '2024-12-11', sales: 0, numOrders: 0 },
// { date: '2024-12-12', sales: 74.1, numOrders: 1 },
// { date: '2024-12-13', sales: 747.62, numOrders: 4 },
// { date: '2024-12-14', sales: 0, numOrders: 0 },
// { date: '2024-12-15', sales: 102.98, numOrders: 1 },
// { date: '2024-12-16', sales: 952.82, numOrders: 3 }
async function getSalesData(startDate, endDate) {
    //aggregate data Aggregating data involves grouping, filtering, and transforming data to 
    //generate useful insights or summarize the data in meaningful ways
    const salesData = await Order.aggregate([
        {
            //stage 1 - filter results
            $match: {
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                }
            }
        },
        {
            //stage 2 - group data
            $group: {
                _id: {
                    date: { 
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }  
                    }
            },
            totalSales: { $sum: "$totalAmount" },
            numOrder: { $sum: 1 } //1 means count the number of orders, number of sales of that date
        }
        }
    ])


    let totalSales=0;
    let totalNumOrders=0;
    //create a map to store sales data and num of order by data

    const salesMap = new Map();
    salesData.forEach((entry) =>{
        const date = entry?._id.date;
        const sales = entry?.totalSales;
        const numOrders = entry?.numOrder;
        
        salesMap.set(date, {sales, numOrders});
        totalSales += sales;
        totalNumOrders += numOrders;
    });
    //generate an array of dates between start and end of date;
    const dateBetween = getDatesBetween(startDate, endDate);
    
    //create final sales data array with 0 for dates without sales
    const finalSalesData = dateBetween.map((date)=> ({
        date,
        sales: (salesMap.get(date) || {sales : 0}).sales,
        numOrders: (salesMap.get(date) || {numOrders : 0}).numOrders
    }));

    return {
        salesData: finalSalesData,
        totalSales,
        totalNumOrders
    }
}
function getDatesBetween(startDate, endDate){
    const dates = [];
    let currentDate = new Date(startDate);

    while(currentDate <= new Date(endDate)){
        //2024-12-17T00:44:10.000Z 
        const formattedDate = currentDate.toISOString().split('T')[0];
        dates.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1); // add a new day
    }

    return dates;
}
// Get Sales Data => api/admin/get_sales
export const getSales = (catchAsyncErrors(async (req, res, next) => {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);

    startDate.setUTCHours(0, 0, 0, 0); //starts at 12am
    endDate.setUTCHours(23, 59, 59, 999); // ends at 12pm, 24hours


    const {
        salesData,
        totalSales,
        totalNumOrders
    } = await getSalesData(startDate, endDate)

    res.status(200).json({
        totalSales,
        totalNumOrders,
        sales: salesData,
    })
}))