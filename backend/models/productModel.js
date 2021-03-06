import mongoose from 'mongoose';

//! TEST: SET NAME/comment BACK TO TRUE
const reviewSchema = new mongoose.Schema({
    name: { type: String, required: false },
    rating: { type: Number, default: 0},
    comment: { type: String, required: false}
}, {
    timestamps: true,
})


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,

    },
    price: {
        type: Number, 
        default: 0,
        required: true
    },
    info: {
        type: String,
        required: true
 
    },
    // inCart: {
    //     type: Boolean,
    //     required: false,
    //     default: false
    // },
    // count: {
    //     type: Number,
    //     required: false,
    // },
    stock: {
        type: Number,
        default:0,
        required: true
    },
    // total: {
    //     type: Number,
    //     required: false

    // },
    type: {
        type: Number,
        required: true
    },
    sale: {
        type: Boolean,
        required: true,
        default: false
    },
    discount: {
        type: Number,
        required: false
    },
    mainPage: {
        type: Boolean,
        required: true,
        default: false
    },
    newItem: {
        type: Boolean,
        required: true,
        default: false

    },
    rating: {
        type: Number,
        default: 0,
        required: true
    },
    numReviews: {
        type: Number,
        default: 0,
        required: true
    },
    reviews: [reviewSchema],

});

const productModel = mongoose.model("Product", productSchema);

export default productModel;

