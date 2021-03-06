import express from 'express';
import Banner from '../models/bannerModel';

const router = express.Router();



//? specific id match? 
router.get("/:id", async (req, res) => {
    try {

        //const productId = req.params.id;
        // const product = await Product.find(x => x.id === productId);
        const banner = await Banner.findOne({_id: req.params.id});
        res.json(banner);
    }
   catch (error) {
            res.status(404).send({message: "banner Not Found."})
        }
    });



// //? try catch approach
router.get("/", async (req, res) => {
    try {
        const newBanner = await Banner.find({});
        res.json(newBanner);

    } catch (error) {
        res.json({message: error.message})
    }
});

//? add
router.post('/add', async(req, res) =>{
    const title = req.body.title;
    const img = req.body.img;
    const img2 = req.body.img2;
    const info = req.body.info;
    const link = req.body.link;
    try {
        const banner = new Banner({
            title,
            img,
            img2,
            info,
            link
        });
        const saveBanner = await banner.save();
        res.json(saveBanner);
    } catch (error) {
        res.json({message: error})
    }
});


//update
router.patch('/update/:id', async(req,res) => {
    try {
        const banner = await Banner.updateOne(
            {_id: req.params.id},
           {$set: req.body}
        )
        res.json(banner);
    } catch (err) {
        res.json({ message: err})
    }

});


//delete
//   router.delete("/",  async (req, res) => {
//       try {
//     const banner = await Banner.remove({});
   
      
//       res.send(banner);
//     } catch(error) {
//       res.status(404).send("Product Not Found.")
//     }
//   });

export default router;