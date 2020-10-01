import express from 'express';
import Order from '../models/orderModel';
import {isAuth} from '../util';

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
    try {
        const newOrder = await Order.find({});
        res.json(newOrder);

    } catch (error) {
        res.json({msg: error.message})
    }
});

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
        res.status(201).send({ message: "New Order Created", data: newOrderCreated });
    } catch (err) {
        res.json({ message: err})
    }
})

router.put("/:id/pay", isAuth, async(req, res) => {
    try {

        const order = await Order.findById(req.params.id);
        if(order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.payment = {
                paymentMethod: 'paypal',
                paymentResult: {
                    payerID: req.body.payerID,
                    orderID: req.body.orderID,
                    paymentID: req.body.paymentID
                }
            }
            const updatedOrder = await order.save();
            res.send({ message: "Order Paid.", order: updatedOrder });
        }

     
    } catch (err) {
        res.status(404).send({message:'Order not found.'})
    }
})

export default router;