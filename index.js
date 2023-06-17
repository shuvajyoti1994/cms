const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
const port = 5000;

// Database Connection
connectDB()

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"))

app.listen(port,() =>{
    console.log('server start...')
})