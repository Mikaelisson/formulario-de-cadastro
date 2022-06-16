require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const router = require('./routes/router');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const session = require('express-session');
const PORT = process.env.PORT;


mongoose.connect(process.env.MONGO_CONNECTION_URL, (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('Mongo Connected')
    }
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/styles', express.static(path.join(__dirname, 'views', 'styles')));
app.use(session( {secret: 'nubw72d', resave: true, saveUninitialized: true} ))


app.use('/', router);
app.use('/user', express.urlencoded({extended: true}), userRouter);
app.use('/admin', express.json(), adminRouter);


app.listen(PORT, ()=>{console.log('Server running on port', PORT)})