const express = require('express');
const api = require('../DAL/api');
const router = express.Router();
const path = require('path')



/* GET users listing. */
router.get('/', async function (req, res) {
    const dietsAndCats = await api.getDietsCategoriesInfo();
    res.json(dietsAndCats);
});

router.get('/unitsAndIngs', async function (req, res) {
    const respone = await api.unitsAndIngs();
    res.json(respone);
});


router.get('/RecipeNameAvailable/:name', async function (req, res) {
    const { name } = req.params;
    const response = await api.checkAvailable(name);
    res.json(response);
});

router.get('/MostRecipes', async function (req, res) {
    try {
        const recipes = await api.MostRecipes();
        res.json(recipes);
    } catch (err) {
        res.status(404).json({ error: 'Problem retrieving information from server.' });
    }
});



module.exports = router;
