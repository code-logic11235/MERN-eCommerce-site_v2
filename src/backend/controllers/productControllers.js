import Product from "../models/products.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFilters from "../utils/apiFilters.js";

//logic for our product resource

//=> /api/products
export const getProducts = catchAsyncErrors (async (req, res) =>{
    const itemPerPage = 4;
    const apiFilters = new APIFilters(Product, req.query).search().filters(); 

    console.log(req.user)
    let products = await apiFilters.query; // returns the result and access it by going inside of object
    let productCount = products.length
    
    apiFilters.pagination(itemPerPage);
    products = await apiFilters.query.clone();
    // res.clearCookie('jwttoken')
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
    const product = await Product.findById(req?.params?.id);
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