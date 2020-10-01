import express from 'express';
// import data from './data';
// import { storeProducts } from '../frontend/src/components/api/data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import bannerRoute from './routes/bannerRoute'
import productRoute from './routes/productRoute'
import orderRoute from './routes/orderRoute'
import bodyParser from 'body-parser';

//import bodyParser from 'body-parser';
//const bodyParser = require('body-parser');
const app = express();
dotenv.config();
app.use(bodyParser.json());



const port = process.env.PORT || 5001;

const cors = require("cors");
app.use(cors());


const uri = process.env.MONGO_URI;
    //( uri || 'mongodb://localhost/api/storeProducts', {
mongoose.connect( uri || 'mongodb://localhost/storeProducts', {
    useUnifiedTopology: true,
    useNewUrlParser:true,
    useFindAndModify: false,
    useCreateIndex: true

})
.then(() => { console.log("MongoDB Connection established successfully")
})
.catch(error => console.log(error.reason));


// const connection = mongoose.connection;
// connection.on('open', () => {
//     console.log("MongoDB database connection established successfully");
// })






app.use('/users', userRoute);
app.use('/storeProducts', productRoute);
app.use('/orders', orderRoute);
app.use('/banner', bannerRoute);
app.get('/config/paypal', (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID);
})

//app.get("/api/storeProducts", (req, res) => {
    //! comment out starts here
        // app.get("/api/storeProducts/:id", (req, res) => {
        // // res.header('Access-Control-Allow-Origin', '*');
        //     const productId = req.params.id;
        //     const product = data.storeProducts.find(x => x.title === productId);
        //     if(product) {
        //         res.send(product);
        //     } else {
        //         res.status(404).send({msg: "Product Not Found."})
        //     }
        // // res.send({message: "we did it!" });
        // });

        // app.get("/api/storeProducts", (req, res) => {
        //     // res.header('Access-Control-Allow-Origin', '*');
        //     res.send(data);
        // // res.send({message: "we did it!" });
        // });
    //! ends here
// app.get('/api/detailProduct', (req, res) => {
//     res.send(data.detailProduct);
// });

// app.get('/api/bannerSmall', (req, res) => {
//     res.send(data.bannerSmall);
// });

// app.get('/api/bannerLarge', (req, res) => {
//     res.send(data.bannerLarge);
// });

app.listen(port, () => {console.log("Server started at http://localhost:5001")});
