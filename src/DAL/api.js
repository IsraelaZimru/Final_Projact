const fetch = require('node-fetch');

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
    // console.log("enter the fun'");
    try {
        const data = await fetch(`http://localhost:3100/users`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(userInfo => {
                // console.log(userInfo);
                return userInfo[0]
            })
            .catch(err => console.log(err))
        const prase = await data;
        return prase;
    } catch (err) {
        console.log(err);
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
        recipe.image = `http://localhost:3100/${recipe.image}`
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
