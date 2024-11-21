import mongoose from "mongoose";

export const connectDatabase = () =>{

    let DB_URI="";
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        DB_URI = process.env.DB_LOCAL_URI;
    }else if(process.env.NODE_ENV === 'PRODUCTION'){
        DB_URI = process.env.DB_URI;  
    } else {
        DB_URI = process.env.DB_LOCAL_URI;
    }
    mongoose.connect(DB_URI)
    .then((con)=>{
        console.log('MongoDB Database Connected with Host:',con?.connection?.host)
    })
    .catch((err) => {
        console.error('MongoDB Connection Error:', err);
    });
}
