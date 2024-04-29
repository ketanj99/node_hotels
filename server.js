const express = require('express');
const app = express();
const db = require('./db'); // Make sure this file sets up the database connection
require('dotenv').config();

const bodyParser = require('body-parser');
const { error } = require('console');
app.use(bodyParser.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 3000;

// Import the router files
const personRouter = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuitemRoutes');

// Use the routers
app.use('/person', personRouter);
app.use('/menuItem', menuItemRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
