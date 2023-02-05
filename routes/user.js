const router = require('express').Router();
const User = require('../models/User');
const { verifyTokenAndAdmin } = require('./tokenValidator');


// Delete a user 
router.delete('/deleteUser/:id', verifyTokenAndAdmin, async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted");
    } catch (err) {
        res.status(401).send(err);
    }
})

// Update a user 
router.put('/updateUser/:id', verifyTokenAndAdmin, async(req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json("user has been updated");
    } catch (err) {
        res.status(401).send(err);
    }
})



module.exports = router;