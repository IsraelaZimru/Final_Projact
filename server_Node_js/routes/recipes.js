const express = require('express');
const api = require('../DAL/api'); //fun that actully sending HTTP reqs.
const router = express.Router();
const path = require('path')
const upload = require('../utils/multer')


router.post('/upload/:id', upload.single("image"), async function (req, res) {
    try {
        const { id } = req.params;
        const addImageToRecipe = await api.addImage(req.file.filename, id)
        console.log("addImageToRecipe", addImageToRecipe);
        console.log("Image Uploaded.this image url:", req.file.filename)
        res.status(200).json(id);
    } catch (err) {
        res.status(500).json("Image was not included in the request.")
    }
});


router.delete('/:id', async function (req, res) {  //router ==app.get but with more thing...
    const { id } = req.params;
    console.log("enter fun");
    const respone = await api.deleteRecipe(id);
    res.json(respone);
});


router.get('/', async function (req, res) {
    try {
        const recipes = await api.recipes();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ err: "cant return recipes" })
    }
});

router.get('/withIng', async function (req, res) {
    const recipes = await api.recipesAndIngs();
    res.json(recipes);
});



router.get('/myRecipes/:id', async function (req, res) {
    try {
        const { id } = req.params;
        const recipes = await api.myRecipes(id);
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: "Error getting user recipes" })
    }
});



router.get('/MyFavorites/:id', async function (req, res) {
    try {
        const { id } = req.params;
        const recipes = await api.MyFavorites(id);
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: "Error getting user recipes" })
    }
});

router.get('/MyFavorites/ids/:id', async function (req, res) {
    try {
        const { id } = req.params;
        const recipes = await api.MyFavoritesId(id);
        console.log("recipes", recipes);
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: "Error getting user recipes" })
    }
});


router.delete('/MyFavorites/ids/:id/:recipeId', async function (req, res) {
    try {
        const { id, recipeId } = req.params;
        const recipes = await api.removeFromMyFavoritesIds(id, recipeId);
        // console.log("recipesRouer", recipes);
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: "Error getting user recipes" })
    }
});


router.delete('/MyFavorites/:id/:recipeId', async function (req, res) {
    try {
        const { id, recipeId } = req.params;
        const recipes = await api.removeFromMyFavorites(id, recipeId);
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ error: "Error getting user recipes" })
    }
});


router.put('/MyFavorites/:id/:recipeId', async function (req, res) {
    try {
        const { id, recipeId } = req.params;
        const recipes = await api.AddToMyFavorites(id, recipeId);
        res.status(200).json(recipes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error getting user recipes" })
    }
});


module.exports = router;
