const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const { verifyToken } = require('../routes/tokenValidator');



router.get('/cart/:id', verifyToken, async(req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.id });
        res.json(cart);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/addCart', verifyToken, async(req, res) => {
    const newCart = new Cart({
        userId: req.body.userId,
        items: req.body.items,
        totalPrice: req.body.totalPrice,
        paymentMethod: req.body.paymentMethod,
        cardNumber: req.body.cardNumber,
        expirationDate: req.body.expirationDate,
        cvv: req.body.cvv
    });
    try {
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.put('/updateCart/:id', verifyToken, async(req, res) => {
    try {
        await Cart.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json("Cart has been Updated");
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.delete('/deleteCart/:id', verifyToken, async(req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted");
    } catch (err) {
        res.status(400).send(err.message);
    }
})