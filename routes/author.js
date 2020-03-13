const express = require('express');
const router = express.Router();
const {AddAuthor, Search, EditAuthor, DeleteAuthor} = require('../models/author');

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
// Search Author
router.post('/search', async (req,res) => {
    let {text} = req.body;
    try {
        let foundAuthor = await Search(text);
        res.send(foundAuthor);
    } catch (error) {
        res.status(404).send(`Error: ${error}`);
    }
})
//Edit Author
router.put('/edit', async (req,res) => {
    let {name, id} = req.body;
    let tokenKey = req.headers['x-header-token'];
    try {
        await EditAuthor(tokenKey, name, id);
        res.send('success');
    } catch (error) {
        res.status(404).send(`Error: ${error}`);
    }
});
//Delete Author
router.delete('/delete', async (req, res) => {
    let {id} = req.body;
    let token = req.headers['x-header-token'];
    try {
        await DeleteAuthor(token, id);
        res.send('success');
    } catch (error) {
        res.status(404).send(`Error: ${error}`);
    }
})
module.exports = router;