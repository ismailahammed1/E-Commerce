const express = require('express');
const morgan  = require('morgan');
const cors  = require('cors');
const dotenv=require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;
const authRouter=require('./routes/AuthRoutes');       
const productRouter=require('./routes/ProductRoutes');       
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser')

dbConnect();

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use("/api/user", authRouter)
app.use("/api/product", productRouter)
//middlewaers part
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))