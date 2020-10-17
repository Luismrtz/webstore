import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,

    },
    img2: {
        type: String, 
        required: true
    },
    info: {
        type: String,
        required: true
 
    },
    link: {
        type: String,
        required: true
    }

});

const bannerModel = mongoose.model("banner", bannerSchema);

export default bannerModel;

