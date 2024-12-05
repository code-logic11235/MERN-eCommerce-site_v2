import catchAsyncErrors from '../middlewares/catchAsyncErrors.js'
import User from "../models/user.js"
import { getResetPasswordTemplate } from '../utils/emailTemplate.js';
import ErrorHandler from '../utils/errorHandler.js';
import sendEmail from '../utils/sendEmail.js';
import sendToken from '../utils/sendToken.js';
import crypto from "crypto"

//register User => api/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const {name, email, password } = req.body;

    const user = await User.create({
        name, email, password
    });
   sendToken(user, 201, res);
})

//login User => api/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if( !email || !password){
        return next(new ErrorHandler("please enter email & password", 400))
    }

    const user = await User.findOne({
        email, 
    }).select("+password"); // we have to check password because our model doesnt return password

    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    //check if password is correct 
    const passwordMatch = await user.comparePassword(password);
    if(!passwordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401)) 
    }
    
    // same as sendToken()
    const token = user.getJwtToken();
    const options = {
        expires: new Date( Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true // make cookie access only from backend
    };
    res.status(201).cookie("jwtToken", token, options).json({
        token
    });

})
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
   
    res.clearCookie("jwtToken");
    res.status(200).json({
        message: "logged out"
    })
})


//forgot password => api/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {


    const user = await User.findOne({
        email: req.body.email 
    });
    if(!user){
        return next(new ErrorHandler("User not found with this email", 404)); 
    }
    //get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save();

    //create reset password url
    const resetUrl = `${process.env.FRONTEND_URL}/api/password/reset/${resetToken}`;


    const message = getResetPasswordTemplate(user?.name, resetUrl);
    try {
        await sendEmail({
            email: user.email,
            subject: "ShopHaven Password Recovery",
            message
        });

        res.status(200).json({
            message: `Email sent to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpired = undefined;
        await user.save();
        return next(new ErrorHandler(error?.message, 500)); 
    }

})
//change the password after getting reset password token set in user model /password/reset/{token}
export const resetPassword = catchAsyncErrors(async (req,res,next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpired: {$gt: Date.now()}
    })

    if(!user){
        return next(new ErrorHandler("Password reset token is invalid or has been expired", 500)); 
    }
    //check if password dont matches
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match", 500)); 
    }

    //set the new password
    user.password = req.body.password;
    user.resetPasswordExpired = undefined;
    user.resetPasswordToken = undefined;

    await user.save();
    sendToken(user, 200, res);
})

//Get current user profile => api/me

export const getUserProfile = catchAsyncErrors(async (req, res, next) =>{
    const user = await User.findById(req?.user?._id);

    res.status(200).json({
        user
    })
})
// update Password => /api/updatePassword
export const updateCurrentPassword = catchAsyncErrors(async (req, res, next) =>{
    const user = await User.findById(req?.user?._id).select('+password') // select the password field because our schema dont return it
    //check the previous user password 

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatch){
        return next(new ErrorHandler("Old password is incorrect", 400)); 
    }
    user.password = req.body.password;
    user.save();

    res.status(200).json({
        user
    })
})

// update user profile => /api/me/updateProfile
export const updateProfile = catchAsyncErrors(async (req, res, next) =>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user._id, newUserData, { new: true});

    
    res.status(200).json({
        user
    })
})


// ADMIN Get all User=> /api/admin/getAllUser
export const getAllUsers = catchAsyncErrors(async (req, res, next) =>{
    const users = await User.find();


    
    res.status(200).json({
        users
    })
})

// ADMIN get user details => /api/admin/user/:id
export const getUserDetail = catchAsyncErrors(async (req, res, next) =>{
    const user = await User.findById(req.params.id);

    
    if(!user){
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404)); 
    }

    
    res.status(200).json({
        user
    })
})

// ADMIN update details for admin profile => /api/admin/user/:id
export const updateUser = catchAsyncErrors(async (req, res, next) =>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, { new: true});

    
    res.status(200).json({
        user
    })
})

// ADMIN delete profile => /api/admin/user/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) =>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404)); 
    }
    
    await user.deleteOne()
    
    res.status(200).json({
        success: true
    })
})
// upload user avatar => /api/v1/me/upload_avatar
export const uploadAvatar = catchAsyncErrors(async (req, res, next) => {
   
    const avatarRes = await upload_file(req.body.avatar, "ShopHaven/avatars");
    const user = await User.findByIdAndUpdate(req?.user?._id, {
        avatar: avatarRes
    })

    res.status(200).json({
       user
    })
})