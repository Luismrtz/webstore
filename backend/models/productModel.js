import mongoose from 'mongoose';

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
        required: true
    },
    info: {
        type: String,
        required: true
 
    },
    inCart: {
        type: Boolean,
        required: true,
        default: false
    },
    count: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true

    },
    type: {
        type: Number,
        required: true
    },
    sale: {
        type: Boolean,
        required: true
    },
    discount: {
        type: Number,
        required: false
    },
    mainPage: {
        type: Boolean,
        required: false
    },
    newItem: {
        type: Boolean,
        required: false

    }

});

const productModel = mongoose.model("Product", productSchema);

export default productModel;

// {
// 	"name": "beebs",
// 	"email": "macro@beebs.com",
// 	"password": "doo3234",
// 	"isAdmin": true
// }