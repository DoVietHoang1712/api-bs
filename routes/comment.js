const express = require('express');
const router = express.Router();
const {AddComment, EditComment, DeleteComment} = require('../models/comment');
router.post('/add', async (req, res) => {
    let {content, id} = req.body;
    let tokenKey = req.headers['x-header-token'];
    try {
        await AddComment(content, id, tokenKey);
        res.send('success');
    } catch (error) {
        res.status(404).send(`Error: ${error}`);
    }
});

router.put('/edit', async (req, res) => {
    let {content, id, idComment} = req.body;
    let tokenKey = req.headers['x-header-token'];
    try {
        await EditComment(content, id, tokenKey, idComment);
        res.send('success');
    } catch (error) {
        res.status(404).send(`Error: ${error}`);
    }
});

router.delete('/delete', async (req, res) => {
    let {idComment} = req.body;
    let tokenKey = req.headers['x-header-token'];
    try {
        await DeleteComment(tokenKey, idComment);
        res.send('success');
    } catch (error) {
        res.status(404).send(`Error: ${error}`);
    }
});

module.exports = router;