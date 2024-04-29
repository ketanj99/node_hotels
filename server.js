const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');


const Person = require('./models/Parson');
const MenuItem = require('./models/MenuItem');
const { error } = require('console');
app.use(bodyParser.json());  //req.body


// Import the router files
const personRouter = require('./routes/personRoutes');

// Use ther routers
app.use('/person',personRouter);

// Import the router files
const menuitemRoutes = require('./routes/menuitemRoutes');


// Use ther routers
app.use('/menuItem',menuitemRoutes);


app.listen(3000, ()=>{
    console.log('listing on port 3000')
} )