import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter product name"],
        maxLength: [200, "product name cannot exceed 200 characters"],
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [ 
        // {public_id: {type: String, required: true},
        {
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                'Fragrance',
                'Candle',
               
            ],
            message: 'Please select correct category for product'
        }
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId, // referencing users that is created the product
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId, //user that created the product
        ref: 'User',
        required: false
    }},

{timeStamps: true}
);

export default mongoose.model("Product", productSchema);