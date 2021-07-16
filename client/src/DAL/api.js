import axios from 'axios';
import fetch from 'node-fetch';

axios.defaults.baseURL = 'http://localhost:3100';
axios.defaults.withCredentials = true;
axios.defaults.headers['Access-Control-Allow-Origin'] = "http://localhost:3100";
// const fetcher = require('./fetcher');


export function hasPageAaccess(connected, history) {
    if (!connected) {
        console.log(connected, "connected");
        history.push("/")
    }
}

export async function getRecipe() {
    const response = await fetch(`http://localhost:3100/recipes`);
    const recipes = await response.json();
    // recipes.forEach(recipe => recipe.pic = `http://localhost:3100/${recipe.image_url}`);
    recipes.forEach(recipe => recipe.pic = `http://localhost:3100/${recipe.image}`);
    return recipes;
}

export async function getRecipeNames() {
    const response = await fetch(`http://localhost:3100/recipeNames`);
    const onlyNames = await response.json();
    return onlyNames;
}

export async function getingredientsNames() {
    const response = await fetch(`http://localhost:3100/ingredientsName`);
    const onlyNames = await response.json();
    return onlyNames;
}





export async function checkLoginAccess({ email, password }) {
    try {
        const result = await axios.post('/users/login', { email, password });
        // console.log('axios result', result);
        return result.data;
    } catch (err) {
        console.log('login error', err);
    }
}


export async function addNewUser(details) {
    console.log("enter addNewUser fun'");
    try {
        const data = await fetch(`http://localhost:3100/addUser`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(details)
        })
            .then(data => {
                console.log("working");
                console.log("data", data);
                return data;
            })
            .catch(err => console.log(err))
        const prase = await data;
        return prase;
    } catch (err) {
        console.log(err);
        return err;
    }
}


// export function selectedItem(id) {
//     const result = recipes.find(recipe => recipe.id === +id);
//     return Promise.resolve(result);
// }

export async function selectedItem(id) {
    try {
        const result = await fetch("http://localhost:3100/recipeInfo", {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ "id": id })
        })
        const data = await result.json();
        console.log("result", data);
        const recipe = data[0];
        recipe.image = recipe.image ? `http://localhost:3100/${recipe.image}` : "";
        return recipe;
    } catch (err) {
        console.log("err.cant fetch")
    }
}

export async function getDetaildsFromDb(id) {
    try {
        const data = await fetch(`http://localhost:3100/users/getUserInfo`, {
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
        const response = await fetch(`http://localhost:3100/users/${id}`, {
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

export async function getCatsAndDiets() {
    const response = await axios.get(`/information`);
    // const onlyNames = await response.json();
    return response.data;
}

export async function isRecipeNameAvailable(name) {
    const response = await axios.get(`/information/RecipeNameAvailable/${name}`);
    console.log("RecipeNameAvailable-", response);
    return response.data;
}

export async function unitsAndIngs(name) {
    const response = await axios.get(`/information/unitsAndIngs`);
    // console.log("RecipeNameAvailable-", response);
    return response.data;
}

export async function getUpdateDetails(id) {
    const response = await axios.get(`http://localhost:3100/recipeInfo/${id}`);
    // console.log("RecipeNameAvailable-", response);
    return response.data;
}


export async function updateRecipe(id, data, image) {
    try {
        const response = await axios.put(`http://localhost:3100/recipeInfo/${id}`, data);

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

export async function getMyRecipes(id) {
    const response = await axios.get(`/recipes/myRecipes/${id}`);
    response.data.forEach(recipe => recipe.pic = `http://localhost:3100/${recipe.image}`);
    return response.data;
}

export async function getMyFavorites(id) {
    const response = await axios.get(`/recipes/MyFavorites/${id}`);
    response.data.forEach(recipe => recipe.pic = `http://localhost:3100/${recipe.image}`);
    return response.data;
}

export async function RemoveAndReturnFavoritesRecipes(userId, recipeId) {
    const response = await axios.delete(`/recipes/MyFavorites/${userId}/${recipeId}`);
    response.data.forEach(recipe => recipe.pic = `http://localhost:3100/${recipe.image}`);
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
    console.log("onlyId", onlyId);
    return onlyId;
}


export async function setUnSeenRecipe(recipeId) {
    const response = await axios.put(`recipeInfo/unSeenRecipe/${recipeId}`);
    return response.data;
}