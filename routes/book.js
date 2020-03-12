const express = require('express');
const router = express.Router();
const {AddBook} = require('../models/book');
router.post('/add', async(req, res) => {
    let {name, publishDate, pageCount, id} = req.body;
    let tokenKey = req.headers['x-header-token'];
    try {
        await AddBook(name, publishDate, pageCount, tokenKey, id);
        res.send('success');
    } catch (error) {
        res.status(404).send(`Error: ${error}`);
    }
});
module.exports = router;