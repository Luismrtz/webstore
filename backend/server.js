import express from 'express';

import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import bannerRoute from './routes/bannerRoute'
import productRoute from './routes/productRoute'
import orderRoute from './routes/orderRoute'
import bodyParser from 'body-parser';
import uploadRoute from './routes/uploadRoute';


const app = express();
const path = require('path');
dotenv.config();
app.use(bodyParser.json());



const port = process.env.PORT || 5001;

const cors = require("cors");
app.use(cors());


const uri = process.env.MONGO_URI;

mongoose.connect( uri || 'mongodb://localhost/storeProducts', {
    useUnifiedTopology: true,
    useNewUrlParser:true,
    useFindAndModify: false,
    useCreateIndex: true

})
.then(() => { console.log("MongoDB Connection established successfully")
})
.catch(error => console.log(error.reason));





app.use('/uploads', uploadRoute);
app.use('/users', userRoute);
app.use('/storeProducts', productRoute);
app.use('/orders', orderRoute);
app.use('/banner', bannerRoute);
app.get('/config/paypal', (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID);
});

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});


app.listen(port, () => {console.log(`Server started at ${port}`)});
