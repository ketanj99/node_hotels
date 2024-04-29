const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
const { error } = require('console');
app.use(bodyParser.json());  //req.body
const PORT = process.env.PORT || 3000;



// Import the router files
const personRouter = require('./routes/personRoutes');
const menuitemRoutes = require('./routes/menuitemRoutes');

// Use ther routers
app.use('/person',personRouter);
app.use('/menuItem',menuitemRoutes);



app.listen(PORT, ()=>{
    console.log('listing on port ')
} )