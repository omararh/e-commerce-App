const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productRoute = require('../server/routes/product')

require('dotenv').config({
    path: './routes/.env'
});

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => { console.log("Your are connected to the DB") })

app.use(express.json());


app.use('/api/user', authRoute);
app.use('/api', userRoute);
app.use('/api', productRoute);


app.listen(3000, () => {
    console.log("is runnig ;)");
});