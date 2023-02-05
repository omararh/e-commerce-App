const router = require('express').Router();
const Product = require('../models/Product');
const { productValidator } = require('../routes/validation');
const { verifyTokenAndAdmin } = require('../routes/tokenValidator');

//  To create a product the user should be an admin !
router.post('/createProduct', verifyTokenAndAdmin, async(req, res) => {
    const product = new Product({
        name: req.body.name,
        desc: req.body.desc,
        img: req.body.img,
        categories: req.body.categories,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
    })

    //check if the product already exist ? 
    const productExist = await Product.findOne({ name: req.body.name });
    if (productExist) return res.status(400).send('the product Already exists, in this case you have to set the amount.');

    const { error } = productValidator(product);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        await product.save();
        res.send({ product: product._id });
    } catch (err) {
        res.status(400).send(err.message);
    }

})

// DELETE a product 
router.delete('/deleteProduct/:id', verifyTokenAndAdmin, async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    } catch (err) {
        res.status(400).send(err.message);
    }
})


//Update a product 
router.put('/updateProduct/:id', verifyTokenAndAdmin, async(req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json("Product has been Updated");
    } catch (err) {
        res.status(400).send(err.message);
    }
})

//Get a product 
router.get('/getProduct/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({ product });
    } catch (err) {
        res.status(400).send(err.message);
    }
})


// GET all the products 
router.get('/products', (req, res) => {
    try {
        Product.find({}, function(err, products) {
            var productMap = {};
            products.forEach(function(product) {
                productMap[product._id] = product;
            });
            res.send(productMap);
        });
    } catch (err) {
        res.send(err);
    }

})

module.exports = router;