import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import crypto from "crypto"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [50, "your name cannot exceed 50 characters"]
    },  
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    }, 
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Your password must be longer than 6 characters"],
        select: false
    }, 
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date,
    },
    {timestamps: true}

)
//encrypting password before saving the user
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// return JWT token 
//.methods allow you to create functions in the model
userSchema.methods.getJwtToken = function (){
return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn : process.env.JWT_EXPIRE_TIME
}); // sign function allow you to aasign token to user
}

userSchema.methods.comparePassword = async function(password){
   return await bcrypt.compare(password, this.password);
}

// generate password reset token 
userSchema.methods.getResetPasswordToken = function () {
    //generate token 
    const resetToken = crypto.randomBytes(20).toString('hex');

    //hash and set 
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    //set token expired time
    this.resetPasswordExpired = Date.now() + 30 * 60 * 1000;
    return resetToken;
}
export default mongoose.model("User", userSchema);