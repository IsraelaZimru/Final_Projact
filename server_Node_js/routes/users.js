const express = require('express');
const router = express.Router();
const db = require('../utils/database')
const api = require('../DAL/api');


router.post('/getUserInfo', function (req, res) {
  console.log(req.body.id, "req.body.id");
  db.execute(`SELECT * FROM users WHERE id= ?`, [req.body.id])
    .then(result => result[0])
    .then(user => {
      console.log(user);
      res.send(user)
    })
    .catch((err) => res.status(404).send(err));
});



router.post('/login', async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ error: 'email or password incorrect' });
    return;
  }

  try {
    const result = await api.login(email, password);
    if (result) {
      res.cookie('user', result);
      res.status(200).json(result);
    }
    else res.status(401).json({ error: 'email or password incorrect' });
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
});

JSON.stringify
const x = 33;

router.put('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const { firstName, lastName, password, email } = req.body;
    console.log(id, firstName, lastName, password, email);
    const userId = await api.updateUser(id, firstName, lastName, password, email)
    res.json(userId)
  } catch (err) {
    res.status(404).json({ error: 'A user with this email address already exists.' });
  }
})


module.exports = router;
