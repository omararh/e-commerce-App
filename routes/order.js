const express = require("express");
const Order = require("../models/Order");
const { verifyTokenAndAdmin, verifyToken } = require('../routes/tokenValidator');

const router = express.Router();

// Create an Order
router.post("/order", verifyToken, async(req, res) => {
    const order = new Order(req.body);

    try {
        await order.save();
        res.status(201).json({ order });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//DELETE
router.delete("deleteOrder/:id", verifyTokenAndAdmin, async(req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("order/:id", verifyTokenAndAdmin, async(req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Get all Orders
router.get("/orders", verifyTokenAndAdmin, async(req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;