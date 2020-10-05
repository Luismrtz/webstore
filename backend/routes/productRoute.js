import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin} from '../util'
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
router.post('/add', isAuth, isAdmin, async(req, res) =>{
    const title = req.body.title;
    const img = req.body.img;
    const price = req.body.price;
    const info = req.body.info;
    // const inCart = req.body.inCart;
    // const count = req.body.count;
    const stock = req.body.stock;
    // const total = req.body.total;
    const type = req.body.type;
    const sale = req.body.sale;
    const discount = req.body.discount;
    const mainPage = req.body.mainPage;
    const newItem = req.body.newItem;
    const rating = req.body.rating;
    const numReviews = req.body.numReviews;
    try {
        const product = new Product({
            title,
            img,
            price,
            info,
            // inCart,
            // count,
            stock,
            // total,
            type,
            sale,
            discount,
            mainPage,
            newItem,
            rating,
            numReviews
        });
        const newProduct = await product.save();
      
        if( newProduct) {
            return res.status(201).json({message: 'New Product Creted', data: newProduct});
        }
    } catch (error) {
        res.json({message: 'error at productRoute add'})
    }
});


//*UPDATE
router.patch('/update/:id', isAuth, isAdmin, async(req,res) => {
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

//*UPDATE
// router.patch('/update/:id', isAuth, isAdmin, async(req,res) => {
//     try {
//         const product = await Product.updateOne(
//             {_id: req.params.id},
//            {$set: req.body}
//         )
//         const updateProduct = await product.save();
//         if(updateProduct) {
//             return res.status(200).send({message:'Product Updated', data: updateProduct});
//         }

//     } catch (err) {
//         res.json({ message: 'Error in updating Product.' })
//     }

// });



// delete single line in collection
router.patch('/delete/:id', async(req,res) => {
    try {
        const product = await Product.deleteOne(
            {_id: req.params.id},
           {$set: req.body}
        )
        res.json(product);
        // if(product) {
        //     await product.remove();
        //     res.send({message: 'Product Deleted'});
        // }
    } catch (err) {
        res.json({ message: err})
    }

});

export default router;