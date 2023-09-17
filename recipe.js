let recipeForm = document.getElementById('recipe-form');
let recipeImage = document.getElementById('recipeImage')
let recipeName = document.getElementById('recipe-name');
let ingredients = document.getElementById('ingredients');
let steps = document.getElementById('steps');
let displayArea = document.getElementById('display-area');
let recipes = [];

function saveRecipesToLocalStorage() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function loadRecipesFromLocalStorage() {
    let storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
        recipes = JSON.parse(storedRecipes);
        refreshDisplay();
    }
}

loadRecipesFromLocalStorage()

recipeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let enteredImage = recipeImage.value;
    let enteredRecipeName = recipeName.value;
    let enteredIngredients = ingredients.value;
    let enteredSteps = steps.value;


    let newRecipe = {
        image: enteredImage,
        name: enteredRecipeName,
        ingredients: enteredIngredients,
        steps: enteredSteps
    };

    recipes.push(newRecipe);
    displayRecipe(newRecipe);

    recipeImage.value = "";
    recipeName.value = "";
    ingredients.value = "";
    steps.value = "";

    saveRecipesToLocalStorage()
});

function displayRecipe(recipe) {
    let recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe-card');

    recipeDiv.appendChild(createImageElement(recipe.image));
    recipeDiv.appendChild(createTextElement('h3', 'Recipe Name: ' + recipe.name));
    recipeDiv.appendChild(createTextElement('h3', 'Ingredients: ' + recipe.ingredients));
    recipeDiv.appendChild(createTextElement('h3', 'Steps: ' + recipe.steps));

    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";

    deleteButton.onclick = function () {
        let index = recipes.indexOf(recipe)
        deleteRecipe(index);
    };

    recipeDiv.appendChild(deleteButton);
    displayArea.appendChild(recipeDiv);
}

function createTextElement(tagName, text) {
    let element = document.createElement(tagName);
    element.textContent = text;
    return element;
}

function createImageElement(src) {
    let imgElement = document.createElement('img');
    imgElement.src = src;
    return imgElement;
}

function deleteRecipe(index) {
    if (index !== -1) {

        recipes.splice(index, 1);
        saveRecipesToLocalStorage()

        let recipeDivs = document.querySelectorAll('.recipe-card');
        if (recipeDivs[index]) {
            displayArea.removeChild(recipeDivs[index]);
        }
    }
}

function refreshDisplay() {
    recipes.forEach(function (recipe) {
        displayRecipe(recipe);
    });
}
