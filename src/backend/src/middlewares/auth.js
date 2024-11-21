import catchAsyncErrors from "./catchAsyncErrors.js"
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";


//check if user is authenticated
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) =>{
    const {jwtToken} = req.cookies;

    //not authenticated
    if(!jwtToken){
        return next(new ErrorHandler("log in to access resource", 401));
    }
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next();
})

//authorize user roles
export const authorizeRoles = (...roles) => {
    return(req, res, next) => {
        if( !roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allow to access this resource`, 403));
        }
        next();
    }
}
