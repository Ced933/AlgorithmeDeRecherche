class RecipesCard {
    constructor(recipe) {
        this._recipe = recipe
    }

    createRecipeCard() {
        const recipeSection = document.createElement('figure');
        recipeSection.classList.add('figure');
        const recipeCard = ` 
        <figcaption class="figcaption">
        <div class="div-title-span">
            <h3>${this._recipe.name}</h3>
            <span><i class="fa-regular fa-clock me-2"></i>${this._recipe.time} min</span>
        </div>
        <div class="div-describe-p">
            <p class="p-ingredients">${this._recipe.ingredients.map(ingr => ingr.ingredient)} : ${this._recipe.ingredients.map(quanti => quanti.quantity)}</p>
            <p class="p-describe">${this._recipe.description}</p>
        </div>
    </figcaption>`
        recipeSection.innerHTML = recipeCard;
        return recipeSection
    }

    // allIngredientsList() {
    //     const ulList = document.createElement('ul');
    //     // ulList.classList.add('ul-container-list');
    //     const Ulingredients = `<li>${this._recipe.map(item => {
    //         item.ingredients.map(item2 => item2.ingredient)
    //     })} </li>`;

    //     ulList.innerHTML = Ulingredients
    //     return ulList;

    // }
}