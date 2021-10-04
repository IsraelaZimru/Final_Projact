const express = require('express');
const router = express.Router();
const db = require('../utils/database')
const api = require('../DAL/api'); //fun that actully sending HTTP reqs.
const path = require('path')
const { recipeValidations } = require('../DAL/validationObj')
const { validationsFun } = require('../DAL/validationsFun')
const upload = require('../utils/multer')


router.post('/', upload.none(), validationsFun(recipeValidations), async function (req, res) {
    const { recipe, ingredients, instructions } = req.body;
    const result = await api.addNewRecipe(recipe, ingredients, instructions);
    res.json(result);
});

 
module.exports = router;
