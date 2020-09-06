import express from 'express';
import Product from '../models/productModel';

const router = express.Router();



//? specific id match? 
router.get("/:id", async (req, res) => {
    // res.header('Access-Control-Allow-Origin', '*');
    try {

        //const productId = req.params.id;
        // const product = await Product.find(x => x.id === productId);
        const product = await Product.findOne({_id: req.params.id});
        res.json(product);
    }
   catch (error) {
            res.status(404).send({msg: "Product Not Found."})
        }
    // res.send({message: "we did it!" });
    });
        //??? needed???
    // app.get("/api/storeProducts", (req, res) => {
    //     // res.header('Access-Control-Allow-Origin', '*');
    //     res.send(data);
    // // res.send({message: "we did it!" });
    // });



// //? try catch approach
router.get("/", async (req, res) => {
    // User.find() for promise version?
    try {
        const newProduct = await Product.find({});
        res.json(newProduct);

    } catch (error) {
        res.json({msg: error.message})
    }
});

//? add
router.post('/add', async(req, res) =>{
    const title = req.body.title;
    const img = req.body.img;
    const price = req.body.price;
    const info = req.body.info;
    const inCart = req.body.inCart;
    const count = req.body.count;
    const stock = req.body.stock;
    const total = req.body.total;
    const type = req.body.type;
    const sale = req.body.sale;
    const discount = req.body.discount;
    const mainPage = req.body.mainPage;
    const newItem = req.body.new;
    try {
        const product = new Product({
            title,
            img,
            price,
            info,
            inCart,
            count,
            stock,
            total,
            type,
            sale,
            discount,
            mainPage,
            newItem
        });
        const saveProduct = await product.save();
        res.json(saveProduct);
    } catch (error) {
        res.json({message: error})
    }
});


//update
router.patch('/update/:id', async(req,res) => {
    try {
        const product = await Product.updateOne(
            {_id: req.params.id},
           {$set: req.body}
        )
        res.json(product);
    } catch (err) {
        res.json({ message: err})
    }

});
// delete single line in collection
router.patch('/delete/:id', async(req,res) => {
    try {
        const product = await Product.deleteOne(
            {_id: req.params.id},
           {$set: req.body}
        )
        res.json(product);
    } catch (err) {
        res.json({ message: err})
    }

});

export default router;