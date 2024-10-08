const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');
const connectDB = require('./config/db');
const normalizePort = require('./config/normalizePort');
const errorHandler = require('./config/errorHandler');
const productRoutes = require('./routes/productRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

// server/app.js or server/index.js

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Something broke!');
});

// Database connection
connectDB();

const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

// Use the product routes
app.use('/api/product', productRoutes);

// Use the user routes
app.use('/api/users', userRoutes); // Add user routes
app.use('/api/categories', categoriesRoutes);

// Use uploads routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
const server = app.listen(port, () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
});

// Error handling for server startup
server.on('error', (error) => errorHandler(error, port));