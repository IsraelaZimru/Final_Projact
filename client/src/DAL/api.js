import axios from 'axios';
import fetch from 'node-fetch';

axios.defaults.baseURL = 'http://localhost:3100';
axios.defaults.withCredentials = true;
axios.defaults.headers['Access-Control-Allow-Origin'] = "http://localhost:3100";
// const fetcher = require('./fetcher');


export const fakeUsers = [{
    email: "wawa@wawa.com",
    password: "123456",
    name: "wawa"
}, {
    email: "lala@lala.com",
    password: "2021",
    name: "lala"
}, {
    email: "slzimro@gmail.com",
    password: "2021",
    name: "Israela"
}]


const recipes = [{
    id: 7,
    name: "Meat",
    pic: "https://media-cdn.tripadvisor.com/media/photo-s/18/7b/03/e2/ribsteak.jpg",
    date: "",
    views: 12,
    likes: 6,
    userID: "wawa",
    allCategories: ["cosher", "Diet", "Dessert"],
    alldiets: ["lala", "baba"],
    ingredients: [[10, "banba"], [4, "lala"]],
    instructions: ["asasd", "sadasd", "dafw sdd"],
    preparationTime: 10,
    CookingTime: 10,
    discription: "loren dnsaknd k jdjfhskj dsbfsdkj jdjd. jsbckajsdkacd cjdhbc"
},
{
    name: "Garlic and lemon broccoli",
    id: 8,
    pic: "https://www.10dakot.co.il/wp-content/uploads/2020/12/%E2%80%8F%E2%80%8F20201204_131703-%D7%A2%D7%95%D7%AA%D7%A7.jpg",
    date: "10/10/10",
    views: 7,
    likes: 10,
    userID: "wawa",
    allCategories: ["meat", "Diet", "Dessert"],
    alldiets: "",
    ingredients: [[4, "broccoli"], [4, "garlic"]],
    instructions: ["asasd", "sadasd", "dafw sdd"],
    preparationTime: 10,
    CookingTime: 10,
    discription: "loren dnsaknd k jdjfhskj dsbfsdkj jdjd. jsbckajsdkacd cjdhbc"
},
{
    name: "Cake",
    id: 9,
    pic: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2F1542062283%2Fchocolate-and-cream-layer-cake-1812-cover.jpg%3Fitok%3DR_xDiShk",
    date: "20/1/12",
    views: 23,
    likes: 90,
    userID: "wawa",
    alldiets: "",
    allCategories: "",
    ingredients: [[20, "apple"], [12, "garlic"]],
    instructions: ["asasd", "sadasd", "dafw sdd"],
    preparationTime: 10,
    CookingTime: 10,
    discription: "loren dnsaknd k jdjfhskj dsbfsdkj jdjd. jsbckajsdkacd cjdhbc"
}, {
    name: "Meat",
    id: 10,
    pic: "https://media-cdn.tripadvisor.com/media/photo-s/18/7b/03/e2/ribsteak.jpg",
    date: "",
    views: 7,
    likes: 67,
    userID: "wawa",
    alldiets: "",
    allCategories: "",
    ingredients: [[10, "banba"], [4, "lala"]],
    instructions: ["asasd", "sadasd", "dafw sdd"],
    preparationTime: 10,
    CookingTime: 10,
    discription: "loren dnsaknd k jdjfhskj dsbfsdkj jdjd. jsbckajsdkacd cjdhbc"
},
{
    name: "Garlic and lemon broccoli",
    id: 5,
    pic: "https://www.10dakot.co.il/wp-content/uploads/2020/12/%E2%80%8F%E2%80%8F20201204_131703-%D7%A2%D7%95%D7%AA%D7%A7.jpg",
    date: "10/10/10",
    views: 71,
    likes: 12,
    userID: "nana",
    allCategories: "",
    alldiets: "",
    ingredients: [[4, "broccoli"], [4, "garlic"]],
    instructions: ["asasd", "sadasd", "dafw sdd"],
    preparationTime: 10,
    CookingTime: 10,
    discription: "loren dnsaknd k jdjfhskj dsbfsdkj jdjd. jsbckajsdkacd cjdhbc"
},
{
    name: "Cake",
    id: 6,
    pic: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2F1542062283%2Fchocolate-and-cream-layer-cake-1812-cover.jpg%3Fitok%3DR_xDiShk",
    date: "20/1/12",
    views: 12,
    likes: 6,
    userID: "rara",
    allCategories: "",
    alldiets: "",
    ingredients: [[20, "apple"], [12, "garlic"]],
    instructions: ["asasd", "sadasd", "dafw sdd"],
    preparationTime: 10,
    CookingTime: 10,
    discription: "loren dnsaknd k jdjfhskj dsbfsdkj jdjd. jsbckajsdkacd cjdhbc"
}
]


export const ings = [
    {
        id: 1,
        name: "salt"
    },
    {
        id: 2,
        name: "sisi"
    },
    {
        id: 3,
        name: "sala"
    },
    {
        id: 4,
        name: "sqqq"
    },
]

export const fakeUnits = [
    {
        id: 1,
        name: "cup"
    },
    {
        id: 2,
        name: "coco"
    },
    {
        id: 3,
        name: "coqcq"
    },
    {
        id: 4,
        name: "cucucu"
    },
]

export function hasPageAaccess(connected, history) {
    if (!connected) {
        console.log(connected, "connected");
        history.push("/")
    }
}

// export function hasPageAaccess(history) {
//     const isConnected = JSON.parse(localStorage.getItem("user"))
//     if (!isConnected) {
//         history.push("/")
//     }
// }

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
    // console.log("response", response, "response.data", response.data);
    const onlyId = await response.data.map(recipe => recipe.recipeID);
    console.log("onlyId", onlyId);
    return onlyId;
}