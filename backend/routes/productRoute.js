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
            res.status(404).send({message: "Product Not Found."})
        }
    });



router.get("/",  async (req, res) => {
    // User.find() for promise version?
    try {
        const newProduct = await Product.find({});
        res.json(newProduct);

    } catch (error) {
        res.json({message: error.message})
    }
});

//? add
router.post('/add', isAuth, isAdmin, async(req, res) =>{
    const title = req.body.title;
    const img = req.body.img;
    const price = req.body.price;
    const info = req.body.info;
    const stock = req.body.stock;
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

            stock,
            type,
            sale,
            discount,
            mainPage,
            newItem,
            rating,
            numReviews,
      
        });
        const newProduct = await product.save();
      
        if( newProduct) {
            return res.status(201).json({message: 'New Product Created', data: newProduct});
        }
    } catch (error) {
        res.json({message: 'error at productRoute add'})
    }
});


router.post('/:id/reviews', isAuth, async (req, res) => {
    try {
    const product = await Product.findById(req.params.id);
    if (product) {
        const review = {
            name: req.body.name,
            rating: Number(req.body.rating),
            comment: req.body.comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((a, c) => c.rating + a, 0) /
            product.reviews.length;
        const updatedProduct = await product.save();
        res.status(201).send({
            data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            message: 'Review saved successfully.',
        });
        }
    }
 catch(error) {
      res.status(404).send({ message: 'Product Not Found' });
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
        res.json({ message: 'Error in updating Product.' })
    }

});





// delete single line in collection
router.patch('/delete/:id', isAuth, isAdmin, async(req,res) => {
    try {
        const product = await Product.deleteOne(
            {_id: req.params.id},
           {$set: req.body}
        )
        res.json(product);

    } catch (err) {
         res.json({ message: err})
      //  res.status(404).send({message: 'Error in deleting product'});
    }

});



//   router.delete("/", isAuth, async (req, res) => {
//       try {
//     const product = await Product.remove({});
   
      
//       res.send(product);
//     } catch(error) {
//       res.status(404).send("Product Not Found.")
//     }
//   });


export default router;