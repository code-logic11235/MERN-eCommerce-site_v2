import Product from "../models/products.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFilters from "../utils/apiFilters.js";
import Orders from '../models/order.js'

//logic for our product resource

//=> /api/products
// TODO LOOK OVER THIS AGIN to understand
export const getProducts = catchAsyncErrors (async (req, res) =>{
    const itemPerPage = 4;
    const apiFilters = new APIFilters(Product, req.query).search().filters(); 


    let products = await apiFilters.query; // returns the result and access it by going inside of object
    let productCount = products.length
    
    apiFilters.pagination(itemPerPage);
    products = await apiFilters.query.clone();

    res.status(200).json({
        itemPerPage,
        productCount,
        products
    });
});


// admin route, only admin can create new products. => /api/admin/products
export const newProduct = catchAsyncErrors (async (req, res) =>{

    req.body.user = req.user._id;
    const product = await Product.create(req.body);
    //when product gets created we return response 
    res.status(200).json({
        product
    });
});

//get single product details => /api/products/:id
export const getProductDetails = catchAsyncErrors (async (req, res, next) =>{
    const product = await Product.findById(req?.params?.id).populate('reviews.user');
    if(!product){
        return next(new ErrorHandler('Product Not Found', 404));
    }

    res.status(200).json({
        product
    });
});

//ADMIN put  => /api/admin/products/:id     maybe admin TODO:
export const updateProduct = catchAsyncErrors (async (req, res, next) =>{
    let product = await Product.findById(req?.params?.id);
    if(!product){
        return next(new ErrorHandler('Product Not Found', 404));
    }
    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, 
        {new: true} // return updated object when done
    )

    res.status(200).json({
        product
    });
});

//ADMIN delete  => /api/admin/products/:id
export const deleteProduct = catchAsyncErrors (async (req, res, next) =>{
    const product = await Product.findById(req?.params?.id);
    if(!product){
        return next(new ErrorHandler('Product Not Found', 404));
    }
   await product.deleteOne();

    res.status(200).json({
        message: "product deleted"
    });
});


//Create / update product review => /api/product/:id
export const createProductReview = catchAsyncErrors (async (req, res, next) =>{
   
   const {rating, comment, productId } = req.body;
   const review = {
    user: req?.user?._id,
    rating: Number(rating),
    comment
   }
   
    const product = await Product.findById(productId);
    if(!product){
        return next(new ErrorHandler('Product Not Found', 404));
    }
    let numOfReviews = product.reviews.length;
    // check if current user has review current product before
    const isReviewed = product?.reviews?.find(
        review=> review.user.toString() === req?.user?._id.toString()
    )
    // if they have review then update the review
    if(isReviewed){
        // loop through the list of reviews to find the login user
        product.reviews.forEach((review)=>{
            if(review?.user?.toString() === req?.user?._id.toString()){
                review.comment = comment;
                review.rating = rating;
            }
        });
    }else { 
        // if not reviewed then create new review
        product.reviews.push(review);
        product.numOfReviews = numOfReviews

        
    }
    // average ratign of the products
    product.ratings = product.reviews.reduce(function(acc, item) {return(item.rating + acc)}, 0) / (numOfReviews < 1 ? 1 : numOfReviews +1)

    await product.save({validateBeforeSave: false});
    

    res.status(200).json({
       success: true
    });
});

// get review  => api/reviews?id={abc123}
export const getProductReview = catchAsyncErrors (async (req, res, next) =>{
    const product = await Product.findById(req?.query?.id);
    if(!product){
        return next(new ErrorHandler('Product Not Found', 404));
    }
    
    res.status(200).json({
        reviews: product.reviews
    });
});


// ADMIN delete review  => api/admin/review
export const deleteReview = catchAsyncErrors (async (req, res, next) =>{
   
    let product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const reviews = product?.reviews?.filter(
      (review) => review._id.toString() !== req?.query?.id.toString()
    );

    const numOfReviews = reviews.length;
  

    const updatedReview = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
    const ratings =
    numOfReviews === 0
        ? 0
        : updatedReview;




    product = await Product.findByIdAndUpdate(
      req.query.productId,
      { reviews, numOfReviews, ratings },
      { new: true }
    );
  
    res.status(200).json({
      success: true,
      product,
    });
});


//Can user review, can only leave review if user has purchased before => /api/canReview/:id
export const canUserReview = catchAsyncErrors (async (req, res, next) =>{
  const orders = await Orders.find({
    user: req.user._id,
    "orderItems.product": req.query.productId,
  })
  if(orders.length === 0) {
    return res.status(200).json({canReviewed: false});
  }
    res.status(200).json({
        canReview: true
    });
});