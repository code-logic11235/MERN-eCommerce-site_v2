// Create toekn and save in cookie

export default (user, statusCode, res) =>{
    //create jwt token 
    const token = user.getJwtToken();

    const options = {
        expires: new Date( Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true // make cookie access only from backend
    };
    res.status(statusCode).cookie("jwtToken", token, options).json({
        token
    });
}