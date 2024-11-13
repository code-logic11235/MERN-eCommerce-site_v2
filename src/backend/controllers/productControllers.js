import Product from "../models/products.js";
//logic for our product resource

//=> /api/products
export const getProducts = async (req, res) =>{
    const products = await Product.find();
    res.status(200).json({
       products
    });
};

// creating a model
//const userSchema = new mongoose.Schema({
//     name: String,
//     age: Number
//   });
  
//   // Create a model
//   const User = mongoose.model('User', userSchema);
  
//   // Create and save a new user
//   User.create({ name: 'Alice', age: 25 })
//     .then(user => console.log('User created:', user))
//     .catch(err => console.error('Error:', err));

// admin route, only admin can create new products. => /api/admin/products
export const newProduct = async (req, res) =>{
    //req.body will have all the info we need like name, price, quantity ect.. 
    const product = await Product.create(req.body);
    //when product gets created we return response 
    res.status(200).json({
        product
    });
}
//get single product details => /api/products/:id
export const getProduct = async (req, res) =>{
    const product = await Product.findById(req?.params?.id);
    if(!product){
        return res.status(404).json({
            error: "Product not found",
        });
    }

    res.status(200).json({
        product
    });
}

//ADMIN put  => /api/admin/products/:id     maybe admin TODO:
export const updateProduct = async (req, res) =>{
    let product = await Product.findById(req?.params?.id);
    if(!product){
        return res.status(404).json({
            error: "Product not found",
        });
    }
    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, 
        {new: true} // return updated object when done
    )

    res.status(200).json({
        product
    });
}

//ADMIN put  => /api/admin/products/:id
export const deleteProduct = async (req, res) =>{
    const product = await Product.findById(req?.params?.id);
    if(!product){
        return res.status(404).json({
            error: "Product not found",
        });
    }
   await product.deleteOne();

    res.status(200).json({
        message: "product deleted"
    });
}