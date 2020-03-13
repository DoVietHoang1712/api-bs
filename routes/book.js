const express = require('express');
const router = express.Router();
const {AddBook, EditBook, DeleteBook} = require('../models/book');
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

router.put('/edit', async (req, res) => {
    let {name, publishDate, pageCount, idAuthor, idBook} = req.body;
    let tokenKey = req.headers['x-header-token'];
    try {
        await EditBook(name, publishDate, pageCount, tokenKey, idAuthor, idBook);
        res.send('success');
    } catch (error) {
        res.status(404).send(`Error: ${error}`);
    }
});
router.delete('/delete', async (req, res) => {
    let {idBook} = req.body;
    let tokenKey = req.headers['x-header-token'];
    try {
        await DeleteBook(tokenKey, idBook);
        res.send('success');
    } catch (error) {
        res.status(404).send(`Error: ${error}`);
    }
})
module.exports = router;