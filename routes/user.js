const express = require('express');
const router = express.Router();

const {Login, Register, User, Verify} = require('../models/user');
const {LoginValid, RegisterValid} = require('../validation');
router.post('/register', async (req, res) => {
    let {name, email ,password} = req.body;
    try {
        let {error} = Register(req.body);
        if(error) res.status(404).send(error.details[0].message);
        await Register(name, email, password);
        res.send('success');
    } catch (error) {
        res.send(`Error: ${error}`);
    }
});

module.exports = router;