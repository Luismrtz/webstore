import express from 'express';
import Order from '../models/orderModel';
import {isAuth, isAdmin} from '../util';

const router = express.Router();

router.get("/myorders", isAuth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id});
        res.json(orders);

    } catch (error) {
        res.json({message: error.message})
    }
});


router.get("/", isAuth, isAdmin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user');
        res.json(orders);

    } catch (error) {
        res.json({message: error.message})
    }
});



// router.get("/myorders", isAuth, async (req, res) => {
//     const orders = await Order.find({ user: req.user._id });
//     res.send(orders);
//   });


router.get("/:id", isAuth, async(req, res) => {
    try {
    const order = await Order.findOne({_id: req.params.id});
        
            res.json(order);
        
    } catch (error) {
        res.status(404).send("Order not found")
    }
})


router.post("/", isAuth, async(req, res) => {
    try {
        if(req.body.orderItems.length === 0) {
            res.status(400).send({message: 'Cart is empty'});
        }

        const newOrder = new Order({
            orderItems: req.body.orderItems,
            user: req.user._id,
            shipping: req.body.shipping,
            payment: req.body.payment,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice
        });
        const newOrderCreated = await newOrder.save();
        res.status(201).send({ message: "New Order Created", order: newOrderCreated });
    } catch (err) {
        res.json({ message: err})
    }
})




router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      const deletedOrder = await order.remove();
      res.send(deletedOrder);
    } else {
      res.status(404).send("Order Not Found.")
    }
  });


//   router.delete("/", isAuth, async (req, res) => {
//       try {
//     const order = await Order.remove({});
   
      
//       res.send(order);
//     } catch(error) {
//       res.status(404).send("Order Not Found.")
//     }
//   });




router.put("/:id/pay", isAuth, async(req, res) => {
    try {

        const order = await Order.findById(req.params.id);
        if(order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {

                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            }
     
                
            
            const updatedOrder = await order.save();
            res.send({ message: "Order Paid.", order: updatedOrder });
        }

     
    } catch (err) {
        res.status(404).send({message:'Order not found.'})
    }
});


router.put("/:id/deliver", isAuth, async(req, res) => {
    try {

        const order = await Order.findById(req.params.id);
        if(order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.send({ message: "Order Delivered.", order: updatedOrder });
        }

     
    } catch (err) {
        res.status(404).send({message:'Order not found.'})
    }
});

export default router;