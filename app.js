require('dotenv').config();
const express = require('express');
const mongoose=require('mongoose');
const app=express();

//Database Connections
const url='mongodb://localhost/himanshuDB';
mongoose.connect(url,{ useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify:true });
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Database connected...');
}).catch(err=>{
    console.log('Connection failed...');
})
//Set Template Engine
app.set('view engine','ejs');

//Assets
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//routes
require('./routes/web')(app);

app.listen(3000,()=>{
    console.log('Connected on Port 3000');
})