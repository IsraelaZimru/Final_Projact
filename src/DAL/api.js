const fetch = require('node-fetch');

export const recipes = [{
    name: "Meat",
    pic: "https://media-cdn.tripadvisor.com/media/photo-s/18/7b/03/e2/ribsteak.jpg",
    addedDate: "",
    views: 12,
    likes: 6,
    userID: "wawa",
    SuitableFor: ["cosher", "Diet", "Dessert"],
    info: {
        ingredients: [[10, "banba"], [4, "lala"]],
        instructions: ["asasd", "sadasd", "dafw sdd"],
        preparationTime: 10,
        CookingTime: 10,
        discription: "loren dnsaknd k jdjfhskj dsbfsdkj jdjd. jsbckajsdkacd cjdhbc"
    }
},
{
    name: "Garlic and lemon broccoli",
    pic: "https://www.10dakot.co.il/wp-content/uploads/2020/12/%E2%80%8F%E2%80%8F20201204_131703-%D7%A2%D7%95%D7%AA%D7%A7.jpg",
    addedDate: "10/10/10",
    views: 7,
    likes: 10,
    userID: "wawa",
    SuitableFor: ["meat", "Diet", "Dessert"],

    info: {
        ingredients: [[4, "broccoli"], [4, "garlic"]],
        instructions: ["asasd", "sadasd", "dafw sdd"],
        preparationTime: 10,
        CookingTime: 10,
        discription: "loren dnsaknd k jdjfhskj dsbfsdkj jdjd. jsbckajsdkacd cjdhbc"
    }
},
{
    name: "Cake",
    pic: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2F1542062283%2Fchocolate-and-cream-layer-cake-1812-cover.jpg%3Fitok%3DR_xDiShk",
    addedDate: "20/1/12",
    views: 23,
    likes: 90,
    userID: "wawa",

    SuitableFor: "",
    info: {
        ingredients: [[20, "apple"], [12, "garlic"]],
        instructions: ["asasd", "sadasd", "dafw sdd"],
        preparationTime: 10,
        CookingTime: 10,
        discription: "loren dnsaknd k jdjfhskj dsbfsdkj jdjd. jsbckajsdkacd cjdhbc"
    }
}, {
    name: "Meat",
    pic: "https://media-cdn.tripadvisor.com/media/photo-s/18/7b/03/e2/ribsteak.jpg",
    addedDate: "",
    views: 7,
    likes: 67,
    userID: "wawa",

    SuitableFor: "",
    info: {
        ingredients: [[10, "banba"], [4, "lala"]],
        instructions: ["asasd", "sadasd", "dafw sdd"],
        preparationTime: 10,
        CookingTime: 10,
        discription: "loren dnsaknd k jdjfhskj dsbfsdkj jdjd. jsbckajsdkacd cjdhbc"
    }
},
{
    name: "Garlic and lemon broccoli",
    pic: "https://www.10dakot.co.il/wp-content/uploads/2020/12/%E2%80%8F%E2%80%8F20201204_131703-%D7%A2%D7%95%D7%AA%D7%A7.jpg",
    addedDate: "10/10/10",
    views: 71,
    likes: 12,
    userID: "nana",
    SuitableFor: "",
    info: {
        ingredients: [[4, "broccoli"], [4, "garlic"]],
        instructions: ["asasd", "sadasd", "dafw sdd"],
        preparationTime: 10,
        CookingTime: 10,
        discription: "loren dnsaknd k jdjfhskj dsbfsdkj jdjd. jsbckajsdkacd cjdhbc"
    }
},
{
    name: "Cake",
    pic: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2F1542062283%2Fchocolate-and-cream-layer-cake-1812-cover.jpg%3Fitok%3DR_xDiShk",
    addedDate: "20/1/12",
    views: 12,
    likes: 6,
    userID: "rara",
    SuitableFor: "",
    info: {
        ingredients: [[20, "apple"], [12, "garlic"]],
        instructions: ["asasd", "sadasd", "dafw sdd"],
        preparationTime: 10,
        CookingTime: 10,
        discription: "loren dnsaknd k jdjfhskj dsbfsdkj jdjd. jsbckajsdkacd cjdhbc"
    }
}
]

export function hasPageAaccess(connected, history) {
    if (!connected) {
        history.push("/")
    }
}



export async function getRecipe() {
    //get data from server
    return Promise.resolve(recipes)
    // const data = await fetch('http://localhost:3000/recipes')
    //     .then(recipes => recipes.json())
    // .then(rawRecipes => rawRecipes)
    // .catch(err => [])
    // return data
}


// const fakeUser = {
//     email: "wawa@wawa.com",
//     passward: "12345"
// }

// let initialUser = {};
// (function () {
//     if (localStorage.getItem("User")) {
//         const initialUser = JSON.parse(localStorage.getItem("User"));
//     }

// })()

