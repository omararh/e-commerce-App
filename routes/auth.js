const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validateUser, logInValidation } = require('../routes/validation');
const jwt = require('jsonwebtoken')



//sign in
router.post('/register', async(req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmedPassword: req.body.confirmedPassword,
        isAdmin: req.body.isAdmin
    })

    const { error } = validateUser(user);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.body.password !== req.body.confirmedPassword) return res.status(400).send("la confirmation du password est fausse !");

    //check if the user is already in the DB
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('email Already exists');

    //hashing the password  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;


    try {
        await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err.message);
    }
})


//LogIn 
router.post('/login', async(req, res) => {

    const { error } = logInValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('email or password is wrong');

    //password verification
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('email or password is wrong');


    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
})


module.exports = router;