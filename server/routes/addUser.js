var express = require('express');
var router = express.Router();
const db = require('../utils/database')
const api = require('../DAL/api'); //fun that actully sending HTTP reqs.


router.post('/', async function (req, res) {
    try {
        const { firstName, lastName, password, email } = req.body;
        const addNewUser = await api.newUser(firstName, lastName, password, email);
        res.status(200).json(addNewUser);
    } catch (err) {
        res.status(401).json({ error: 'User email already exist' });
    }
});

module.exports = router;
