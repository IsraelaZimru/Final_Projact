import axios from 'axios';
import fetch from 'node-fetch';

// const port = 3100;
const port = 5000;

axios.defaults.withCredentials = true; //I changed it to false!!! meaning that cookies not required!!
axios.defaults.baseURL = `http://localhost:${port}`;
axios.defaults.headers['Access-Control-Allow-Origin'] = `http://localhost:3100`;
// const fetcher = require('./fetcher');



// With flask python-----------------------------------------------------------
export async function MostRecipes() {
    const response = await axios(`/information/MostRecipes`);
    // const response = await axios(`/MostRecipes`, { withCredentials: false });
    response.data[0].forEach(recipe => recipe.pic = `http://localhost:${port}/${recipe.image}`);
    response.data[1].forEach(recipe => recipe.pic = `http://localhost:${port}/${recipe.image}`);
    response.data[2].forEach(recipe => recipe.pic = `http://localhost:${port}/${recipe.image}`);
    return response.data;
}

export async function getMyRecipes(id) {
    //const response = axios.get(`/recipes/myRecipes/${id}`);
    const response = await axios(`recipes/MyRecipes/${id}`, { withCredentials: false });
    response.data.forEach(recipe => recipe.pic = `http://localhost:${port}/${recipe.image}`);
    return response.data;
}



// With express node js -----------------------------------------------------------
export async function getRecipe() {
    const response = await axios(`/recipes`);
    const recipes = response.data;
    recipes.forEach(recipe => recipe.pic = `http://localhost:${port}/${recipe.image}`);
    return recipes;
}

export async function getRecipeNames() {
    const response = await axios(`/recipeNames`);
    return response.data;
}

export async function getingredientsNames() {
    const response = await axios(`/ingredientsName`);
    return response.data;
}

export async function getCatsAndDiets() {
    const response = await axios.get(`/information`);
    return response.data;
}

export async function isRecipeNameAvailable(name) {
    const response = await axios.get(`/information/RecipeNameAvailable/${name}`, { withCredentials: false });
    console.log("RecipeNameAvailable-", response);
    return response.data;
}

export async function unitsAndIngs(name) {
    const response = await axios.get(`/information/unitsAndIngs`);
    return response.data;
}

export async function getUpdateDetails(id) {
    const response = await axios.get(`http://localhost:${port}/recipeInfo/${id}`);
    return response.data;
}

export async function getMyFavorites(id) {
    const response = await axios.get(`/recipes/MyFavorites/${id}`);
    response.data.forEach(recipe => recipe.pic = `http://localhost:${port}/${recipe.image}`);
    return response.data;
}

export async function RemoveAndReturnFavoritesRecipes(userId, recipeId) {
    const response = await axios.delete(`/recipes/MyFavorites/${userId}/${recipeId}`);
    response.data.forEach(recipe => recipe.pic = `http://localhost:${port}/${recipe.image}`);
    return response.data;
}

export async function addToMyFavorites(userId, recipeId) {
    const response = await axios.put(`/recipes/MyFavorites/${userId}/${recipeId}`);
    const onlyId = await response.data.map(recipe => recipe.recipeID);
    return onlyId;
}

export async function getMyFavoritesId(userId) {
    const response = await axios.get(`/recipes/MyFavorites/ids/${userId}`);
    const onlyId = await response.data.map(recipe => recipe.recipeID);
    return onlyId;
}

export async function RemoveFromMyFavorites(userId, recipeId) {
    const response = await axios.delete(`/recipes/MyFavorites/ids/${userId}/${recipeId}`);
    const onlyId = await response.data.map(recipe => recipe.recipeID);
    return onlyId;
}

export async function setUnSeenRecipe(recipeId) {
    const response = await axios.put(`recipeInfo/unSeenRecipe/${recipeId}`);
    return response.data;
}


export async function checkLoginAccess({ email, password }) {
    try {
        const result = await axios.post('/users/login', { email, password });
        return result.data;
    } catch (err) {
        console.log('login error', err);
    }
}



export async function addNewUser(details) {
    try {
        console.log("enter addNewUser fun'");
        const respone = await axios.post(`/addUser`, details)
        return respone.data;
    } catch (err) {
        console.log(err);
        // return err;
    }
}

export async function selectedItem(id) {
    try {
        const result = await fetch(`http://localhost:${port}/recipeInfo`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ "id": id })
        })
        const data = await result.json();
        console.log("result", data);
        const recipe = data[0];
        recipe.image = recipe.image ? `http://localhost:${port}/${recipe.image}` : "";
        console.log("recipe", recipe);
        return recipe;
    } catch (err) {
        console.log("Error. Cant fetch")
    }
}

export async function getDetaildsFromDb(id) {
    try {
        const data = await fetch(`http://localhost:${port}/users/getUserInfo`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(id)
        })
        const userinfo = await data.json()
        // console.log("userinfo", userinfo);
        return userinfo;
    } catch (err) {
        console.log(err);
    }
}

export async function updateUserInfo({ id, ...rest }) {
    try {
        const response = await fetch(`http://localhost:${port}/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(rest)
        })
        const details = await response.json();
        return details;

    } catch (err) {
        console.log(err);
    }
}

export async function setNewRecipe(data, image) {
    try {
        const response = await axios.post("/addNewRecipe", data);
        if (response.data) {
            await axios.post(`/recipes/upload/${response.data}`, image);
            console.log(response.data);
            return response.data;
        } else {
            throw new Error("can't add new recipe or image")
        }
    } catch (err) {
        console.log(err)
    }
}


// export async function loadImgePY(id, image) {
//     try {
//         const response = await axios.post(`/recipes/upload/${id}`, image);
//         console.log(response.data);
//         return response.data;
//     } catch (err) {
//         console.log(err)
//     }
// }

export async function updateRecipe(id, data, image) {
    try {
        const response = await axios.put(`http://localhost:${port}/recipeInfo/${id}`, data);

        if (!response.data) {
            throw new Error("can't add new recipe or image")
        }

        if (image) {
            await axios.post(`/recipes/upload/${id}`, image);
        }
        return response.data;
    } catch (err) {
        console.log(err)
    }
}