require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')


const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true,
}))
app.use('/user', require('./routers/userRouter'))
app.use('/api', require('./routers/categoryRouter'))
app.use('/api', require('./routers/productRouter'))
app.use('/api', require('./routers/upload'))
app.use('/user', require('./routers/orderRouter'))



// connect to mongodb
const URI = process.env.MONGODB_URI;



mongoose.connect(URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
});


app.get('/', (req, res) => {
    res.json({msg:'E-commerce Service'})
})

const PORT = process.env.PORT || 6000


//Start Server
app.listen(PORT , ()=>{
    console.log('Server is up and running', PORT)
})
