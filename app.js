const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// const dotenv = require("dotenv");
const path = require("path");

//Config       
if(process.env.NODE_ENV!== "PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"});
} 
app.use(express.json());
app.use(cookieParser());
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(fileUpload());

//Route Imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require("./routes/orderRoute");
const payment = require('./routes/paymentRoute');

app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order);
app.use('/api/v1',payment);

app.use(express.static(path.join(__dirname,"../front_end/build")));

app.get("*",(req,res) => {
    res.sendFile(path.resolve(path.join(__dirname,"../front_end/build/index.html")));
})

app.use(errorMiddleware);

module.exports = app








