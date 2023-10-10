const Order = require('../models/orderModel');

const orderController = {

createOrder: async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
        console.log (order)
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error creating order" });
    }
},

getOrder: async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ msg: "Error fetching order" });
    }
},

getUserOrders: async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ msg: "Error fetching user's orders" });
    }
},

};
module.exports = orderController;
