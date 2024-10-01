// server/routes/categories.js
const express = require('express');
const router = express.Router();
const categories = require('../config/categories');

router.get('/', (req, res) => {
    res.json(categories);
});

module.exports = router;