const express = require('express');
const router = express.Router();
const {AddAuthor} = require('../models/author');

router.post('/add', async (req, res) => {
    let {name} = req.body;
    let tokenKey = req.headers['x-header-token'];
    try {
        await AddAuthor(tokenKey, name);
        res.send('success');
    } catch (error) {
        res.status(404).send(`Error: ${error}`);
    }
}) 

module.exports = router;