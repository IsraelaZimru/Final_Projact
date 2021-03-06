const db = require('../utils/database') // mysql2.pool.promise()
const { mergeTwoSQLTable, addingredientsToRecipe, organizedData, organizedIngredients, organizedinstructions } = require('../utils/halpersFun')

const recipes = async () => {
    const [recipes, fields] = await db.execute('Select * from recipes where isPrivate = 0 order by date desc');
    const [categories, catFields] = await db.execute('select name, recipeId from recipecategory join categories on recipecategory.CategoryTypeId = categories.id; ');
    const [diets, fieldsRD] = await db.execute(`select name, recipeId from recipediet join diets on diets.id = recipediet.DietId`);
    const [ings, fieldsI] = await db.execute(`select name, recipeId from recipeingredients join ingredients on ingredients.id = recipeingredients.IngredientID;`);

    mergeTwoSQLTable([recipes, categories], "allCategories");
    mergeTwoSQLTable([recipes, diets], "alldiets");
    mergeTwoSQLTable([recipes, ings], "allIngredients");
    return recipes;

}

const recipeInfoRow = async (recipeId) => {
    try {
        const [recipe, fields] = await db.query(`select id,userId,name as "recipeName", description,level,Servings,prepTimeMins,CookingTime from recipes where id = ?; select categories.id as "id" from recipecategory join categories on recipecategory.CategoryTypeId = categories.id
        where recipeId = ?; select diets.id as "id" from recipediet join diets on recipediet.DietId = diets.id where recipeId = ?;`, [recipeId, recipeId, recipeId]);

        const [ingredients, fieldI] = await db.query(`SELECT i.id as ingredientId, i.name as ingredientName, m.id as unitId, m.name as unitName, ri.Quantity FROM recipeingredients as ri
        join ingredients as i on ri.IngredientID = i.id
        join measuringunits as m on ri.MeasuringUnitID = m.id
        where recipeID = ?`, [recipeId])

        const [instructions, fieldi] = await db.query(`SELECT instruction FROM  instructions where recipeId = ?`, [recipeId])

        const step1 = await organizedData(recipe);
        const step2 = await organizedIngredients(ingredients);
        const step3 = await organizedinstructions(instructions);


        return [step1, step2, step3];
    } catch (err) {
        console.log(err);;
    }
}




const recipeInfo = async (recipeId) => {
    try {
        const [updateViews, fieldViews] = await db.query(`SELECT @_view := (SELECT views from recipes WHERE id = ?) + 1; UPDATE recipes SET views = @_view WHERE id = ? ;`, [recipeId, recipeId]);
        const [recipe, fields] = await db.query(`select recipes.*,users.firstname "username" from recipes join users 
        on recipes.userid = users.id where recipes.id = ?`, [recipeId]);
        const [categories, fieldsC] = await db.execute('select name, recipeId from recipecategory join categories on recipecategory.CategoryTypeId = categories.id', [recipeId]);
        const [instructions, fieldsI] = await db.execute('select recipeId,instruction "name" from instructions where recipeId = ?', [recipeId]);
        const [ingredients, fieldsRI] = await db.execute(`select quantity,mi.name "unit", i.name "ingredientName"   
            from recipeingredients as ri join ingredients as i on ri.IngredientID = i.id join measuringunits as mi
            on mi.id = ri.MeasuringUnitID  where recipeId = ?`, [recipeId]);
        const [diets, fieldsRD] = await db.execute(`select name, recipeId from recipediet join diets 
        on diets.id = recipediet.DietId where recipeid= ?`, [recipeId]);

        const newPropertyTitles = ["categories", "diets", "instructions"]
        const newProperties = [categories, diets, instructions]

        addingredientsToRecipe([recipe, ingredients])

        for (let i = 0; i < newPropertyTitles.length; i++) {
            mergeTwoSQLTable([recipe, newProperties[i]], newPropertyTitles[i])
        }
        // console.log(recipe);
        return recipe;
    } catch (err) {
        console.log(err);;
    }
}


const newUser = async (firstName, lastName, password, email) => {
    const [user, fields] = await db.execute(`INSERT INTO users (firstName, lastName, password, email) VALUES
        ("${firstName}", "${lastName}", "${password}", "${email}")`)
    return user;
}

const onlyRecipesName = async () => {
    const [names, fields] = await db.execute('Select id,name from recipes where isPrivate = 0');
    return names;
}

const onlyingredientsName = async () => {
    const [names, fields] = await db.execute('Select id,name from ingredients');
    return names;
}

const updateUser = async (id, firstName, lastName, password, email) => {
    try {
        const myquery = "SET @id= ?; SET @firstName= ?;SET @lastName= ?;SET @password= ?;SET @email= ?; \
        call add_or_change_user(@id, @firstName, @lastName, @password, @email)"

        const [user, fields] = await db.query(myquery, [id, firstName, lastName, password, email]);
        const userId = await user.find(element => element.constructor === Array)
        return userId;
    } catch (err) {
        throw new Error(err)
    }
}

const login = async (email, password) => {
    try {
        const [result, fields] = await db.execute(`SELECT id,firstname as 'name',email FROM users WHERE email = ? and password = ?`, [email, password]);

        return result[0];

    } catch (error) {
        throw new Error('Unknown error');
    }
}

const addNewRecipe = async (recipe, ingredients, instructions) => {
    try {
        const query = `SET @id = ?; SET @name = ? ; SET @userID = ?; SET @description = ?; SET @level = ?; SET @Servings = ?;
        SET @prepTimeMins = ?; SET @CookingTime = ?;
        call add_or_change_recipe(@id, @name, @userID, @description, @level, @Servings, @prepTimeMins, @CookingTime);`

        const { CookingTime, Servings, prepTimeMins, recipeName, userId, description, level, categories, diets } = recipe;
        const [newRecipe, fields] = await db.query(query, [0, recipeName, userId, description, level, Servings, prepTimeMins, CookingTime])
        const newRecipeId = await newRecipe.find(element => element.constructor === Array)
        console.log("id", newRecipeId[0].id);
        const flatingredientsData = ingredients.flatMap(ele => [ele.ingredient.id, ele.unit.id, ele.quantity])

        const temp = `(${newRecipeId[0].id},?), `.repeat(categories.length).slice(0, -2)
        const temp2 = `(${newRecipeId[0].id},?), `.repeat(diets.length).slice(0, -2)
        const temp3 = `(${newRecipeId[0].id},?), `.repeat(instructions.length).slice(0, -2)
        const temp4 = `(${newRecipeId[0].id},?, ?, ?), `.repeat(ingredients.length).slice(0, -2)




        const categoriesDietsInstructionQuery = `INSERT INTO recipecategory (recipeId, CategoryTypeId) VALUES ${temp};
         INSERT INTO recipediet (recipeId, DietId) VALUES ${temp2};
         INSERT INTO instructions (recipeId,instruction) VALUES ${temp3};
         INSERT INTO recipeingredients (recipeID, IngredientID, MeasuringUnitID, Quantity) VALUES ${temp4};`

        const allData = [...categories, ...diets, ...instructions, ...flatingredientsData]
        const [moreInfo, fieldsC] = await db.query(categoriesDietsInstructionQuery, [...allData]);

        return newRecipeId[0].id;
    } catch (err) {
        console.log(err);;
    }
}


const getDietsCategoriesInfo = async () => {
    try {
        const [data, fields] = await db.query('Select id,name from diets;Select id,name from categories');
        // const [categories, fieldsc] = await db.execute('Select id,name from categories');
        return data;
    } catch (err) {
        console.log(err);
    }
}

const checkAvailable = async (name) => {
    try {
        const [data, fields] = await db.execute('Select * from recipes where name = ?', [name]);
        if (data.length === 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

const unitsAndIngs = async () => {
    try {
        const [data, fields] = await db.query('Select id,name from ingredients;Select id,name from measuringunits');
        // const [categories, fieldsc] = await db.execute('Select id,name from categories');
        return data;
    } catch (err) {
        console.log(err);
    }
}

const addImage = async (imageName, idRecipe) => {
    try {
        const [data, fields] = await db.execute(`UPDATE recipes SET image = ? WHERE id = ?;`, ["images/" + imageName, idRecipe]);
        return data;
    } catch (err) {
        console.log(err);
    }
}

const deleteRecipe = async (id) => {
    try {
        const [data, fields] = await db.query(`SET @id = ?; CALL delete_recipe_data_from_linked_tables(@id);`, [id]);
        return data;
    } catch (err) {
        console.log(err);
    }
}

const updateRecipe = async (id, recipe, ingredients, instructions) => {
    try {
        const query = `SET @id = ?; SET @name = ? ; SET @userID = ?; SET @description = ?; SET @level = ?; SET @Servings = ?;
        SET @prepTimeMins = ?; SET @CookingTime = ?;
        call add_or_change_recipe(@id, @name, @userID, @description, @level, @Servings, @prepTimeMins, @CookingTime);`

        const deletQuery = `SET @id = ?; CALL delete_only_data_from_linked_tables(@id);`


        const { CookingTime, Servings, prepTimeMins, recipeName, userId, description, level, categories, diets } = recipe;
        const [updateRecipe, fields] = await db.query(query, [id, recipeName, userId, description, level, Servings, prepTimeMins, CookingTime])

        const [deletOldDate, fieldsO] = await db.query(deletQuery, id)

        const flatingredientsData = ingredients.flatMap(ele => [ele.ingredient.id, ele.unit.id, ele.quantity])
        const temp = `(${id},?), `.repeat(categories.length).slice(0, -2)
        const temp2 = `(${id},?), `.repeat(diets.length).slice(0, -2)
        const temp3 = `(${id},?), `.repeat(instructions.length).slice(0, -2)
        const temp4 = `(${id},?, ?, ?), `.repeat(ingredients.length).slice(0, -2)

        const categoriesDietsInstructionQuery = `INSERT INTO recipecategory (recipeId, CategoryTypeId) VALUES ${temp};
         INSERT INTO recipediet (recipeId, DietId) VALUES ${temp2};
         INSERT INTO instructions (recipeId,instruction) VALUES ${temp3};
         INSERT INTO recipeingredients (recipeID, IngredientID, MeasuringUnitID, Quantity) VALUES ${temp4};`

        const allData = [...categories, ...diets, ...instructions, ...flatingredientsData]
        const [moreInfo, fieldsC] = await db.query(categoriesDietsInstructionQuery, [...allData]);

        return id;
    } catch (err) {
        console.log(err);;
    }
}

const myRecipes = async (id) => {
    try {
        const [recipes, fields] = await db.execute('Select * from recipes where userID = ? and isPrivate = 0', [id]);
        // console.log(recipes);
        // return recipes;
        const [categories, catFields] = await db.execute('select name, recipeId from recipecategory join categories on recipecategory.CategoryTypeId = categories.id; ');
        mergeTwoSQLTable([recipes, categories], "allCategories");
        return recipes;
    } catch (err) {
        throw new Error('Problem connecting with SQL')
    }
}

const MyFavorites = async (id) => {
    try {
        const [recipes, fields] = await db.execute('Select * from recipes where isPrivate = 0 and id in (select recipeID from favorites where userID = ?)', [id]);
        const [categories, catFields] = await db.execute('select name, recipeId from recipecategory join categories on recipecategory.CategoryTypeId = categories.id; ');
        mergeTwoSQLTable([recipes, categories], "allCategories");
        return recipes;
    } catch (err) {
        throw new Error('Problem connecting with SQL')
    }
}

const MyFavoritesId = async (id) => {
    try {
        const [recipes, fields] = await db.execute('select recipeID FROM favorites WHERE userID = ?', [id]);
        // console.log("recipes", recipes);
        return recipes;
    } catch (err) {
        throw new Error('Problem connecting with SQL')
    }
}


const removeFromMyFavorites = async (userId, recipeId) => {
    try {
        const [recipes, fields] = await db.execute('DELETE FROM favorites WHERE userID= ? and recipeID= ?;', [userId, recipeId]);
        const newLst = await MyFavorites(userId)
        return newLst;
    } catch (err) {
        throw new Error('Problem connecting with SQL')
    }
}


const removeFromMyFavoritesIds = async (userId, recipeId) => {
    try {
        const [recipes, fields] = await db.execute('DELETE FROM favorites WHERE userID= ? and recipeID= ?;', [userId, recipeId]);
        const newLst = await MyFavoritesId(userId)
        console.log("newLst", newLst);
        return newLst;
    } catch (err) {
        throw new Error('Problem connecting with SQL')
    }
}


const AddToMyFavorites = async (userId, recipeId) => {
    try {
        const [recipes, fields] = await db.query('INSERT INTO favorites (userID, recipeID ) VALUES (?,?); SELECT recipeID FROM favorites WHERE userID = ?', [userId, recipeId, userId]);
        console.log("recipesID", recipes[1]);
        const newLst = await recipes[1]
        return newLst;
    } catch (err) {
        throw new Error('Problem connecting with SQL')
    }
}


const unSeenRecipe = async (recipeId) => {
    try {
        const [recipe, fields] = await db.execute('UPDATE recipes SET isPrivate = 1 WHERE id = ?;', [recipeId]);
        // console.log("recipe-", recipe[1]);
        // const newLst = await recipe[1]
        return recipe;
    } catch (err) {
        throw new Error('Problem connecting with SQL')
    }
}

const MostRecipes = async () => {
    try {
        const [recipes, fields] = await db.query(`SELECT id,name,image,CookingTime FROM recipes order by CookingTime limit 5;
        SELECT id,image,date FROM recipes order by date desc limit 1; SELECT id,image,views  FROM recipes order by views desc limit 1;`);
        return recipes;
    } catch (err) {
        throw new Error('Problem connecting with SQL')
    }
}

module.exports = {
    recipes,
    onlyRecipesName,
    onlyingredientsName,
    newUser,
    recipeInfo,
    updateUser,
    login,
    addNewRecipe,
    getDietsCategoriesInfo,
    checkAvailable,
    unitsAndIngs,
    addImage,
    deleteRecipe,
    recipeInfoRow,
    updateRecipe,
    myRecipes,
    MyFavorites,
    removeFromMyFavorites,
    AddToMyFavorites,
    MyFavoritesId,
    removeFromMyFavoritesIds,
    unSeenRecipe,
    MostRecipes
}