class App {
    constructor() {
        this.recetteApi = new Api('data/recette.json');
        this.sectionRecipe = document.querySelector('.figure-section');
        this.sectionInredients = document.querySelector('.container-ul');

    }

    async AllRecepie() {
        // console.log(this.recetteApi);
        // Les 50 recettes 
        const dataRecipes = await this.recetteApi.getApi();
        // console.log(dataRecipes.recipes[0].ingredients.map(item => {
        //     item.ingredient
        // }));
        // destructuring  pour avoir que le tableau des recette et non pas plusieur index 
        const { recipes } = await this.recetteApi.getApi();

        console.log(recipes);
        // boucler les ingrédients 
        // recipes[1].ingredients.map(ingr => {
        //     console.log(ingr.ingredient);
        // });


        // liste de tous les ingrédients

        const ulHtmlList = document.querySelector('.ul-container-list');
        function listOfIngredient() {
            // Boucle dans une boucle pour pouvoir maper les ingredients 
            // flatMap  sert a desctructurer les tableaux à l'interieur d'un tableau et les meme tous au meme niveau dans un tableau  
            const ingredients = recipes.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x)
            // je mets ingrédients dans set pour avoir chaque valeur une seul fois 
            let setIngredient = new Set(ingredients);
            // j'initialise une variable a vide 
            let ingredientItem = "";
            // je boucle le Set
            setIngredient.forEach(function (value) {
                ingredientItem += '<li class="li-ingredient">' + value + '</li>';
            });
            // a l'intérieur du ul je mets tous mes li 
            ulHtmlList.innerHTML = ingredientItem;
            return setIngredient;
        }
        listOfIngredient();

        const ulHtmlListAppliance = document.querySelector('.ul-container-list-appliance');
        function listOfAppliance() {
            // Boucle dans une boucle pour pouvoir maper les ingredients 
            const appliances = recipes.map(item => item.appliance.toLowerCase());
            let setAppliance = new Set(appliances);
            let appliancesItem = "";

            setAppliance.forEach(function (value) {
                appliancesItem += '<li class="li-appliance">' + value + '</li>';
            });

            ulHtmlListAppliance.innerHTML = appliancesItem;
        }
        listOfAppliance();


        const ulHtmlListUstensils = document.querySelector('.ul-container-list-ustensils');
        function listOfUstenciles() {
            // Boucle dans une boucle pour pouvoir maper les ingredients 
            const ustensils = recipes.map(item => item.ustensils.map(item2 => item2.toLowerCase())).flatMap(x => x);
            // const ustensils = recipes.ustensils.map(item => console.log(item.ustensils));

            let setUstensils = new Set(ustensils);
            let ustensilsItem = "";

            setUstensils.forEach(function (value) {
                ustensilsItem += '<li class ="li-ustensil">' + value + '</li>';
            });

            ulHtmlListUstensils.innerHTML = ustensilsItem;
        }
        listOfUstenciles();





        // toutes les recettes 
        // dataRecipes.recipes.forEach(recipe => {

        //     const Template = new RecipesCard(recipe);
        //     this.sectionRecipe.appendChild(Template.createRecipeCard());

        // });
        let figureSection = document.querySelector('.figure-section');
        let mainInputSearch = document.querySelector('#search-main');

        let dataArray;
        async function getRecipes() {


            createRecipesCard(recipes);
        }
        getRecipes();

        console.log(dataRecipes);
        function createRecipesCard(listRecipe) {

            listRecipe.forEach(recipe => {

                const recipeFigure = document.createElement('figure');
                recipeFigure.classList.add('figure');
                recipeFigure.innerHTML = ` 
                <figcaption class="figcaption">
                <div class="div-title-span">
                    <h3>${recipe.name}</h3>
                    <span><i class="fa-regular fa-clock me-2"></i>${recipe.time} min</span>
                </div>
                <div class="div-describe-p">
                    <p class="p-ingredients">${recipe.ingredients.map(ingr => ingr.ingredient)} : ${recipe.ingredients.map(quanti => quanti.quantity)}</p>
                    <p class="p-describe">${recipe.description}</p>
                </div>
            </figcaption>`
                figureSection.appendChild(recipeFigure);
            })

        }

        // Search INGREDIENT 

        const ingredientInputSearch = document.querySelector('#search-ingredient');
        ingredientInputSearch.addEventListener('input', filterIngredient)

        function filterIngredient() {

            const filterIngr = ingredientInputSearch.value.toLowerCase();

            const allIngredientItem = document.querySelectorAll('.li-ingredient');


            allIngredientItem.forEach((item) => {
                let text = item.innerHTML;
                console.log(text);
                if (text.toLowerCase().includes(filterIngr.toLowerCase())) {
                    item.style.display = ''
                } else {
                    item.style.display = 'none';
                }
            })

        }


        // SEARCH Appliance 

        const searchInputAppliance = document.querySelector('#search-appliance');
        searchInputAppliance.addEventListener("input", filterAppliance)

        function filterAppliance() {

            const filter = searchInputAppliance.value.toLowerCase();

            const allItem = document.querySelectorAll('.li-appliance');


            allItem.forEach((item) => {
                let text = item.innerHTML;
                console.log(text);
                if (text.toLowerCase().includes(filter.toLowerCase())) {
                    item.style.display = ''
                } else {
                    item.style.display = 'none';
                }
            })

        }



        // SEARCH USTENSILS 

        const searchInputUstensil = document.querySelector('#search-ustensils');
        searchInputUstensil.addEventListener("input", filterUstensil)

        function filterUstensil() {

            const filterUst = searchInputUstensil.value.toLowerCase();

            const allUstensilsItem = document.querySelectorAll('.li-ustensil');


            allUstensilsItem.forEach((item) => {
                let text = item.innerHTML;
                console.log(text);
                if (text.toLowerCase().includes(filterUst.toLowerCase())) {
                    item.style.display = ''
                } else {
                    item.style.display = 'none';

                }
            })

        }


        // a cahque fois qu'on ecrit a l'intérieur du input ça déclanche notre fonction filterData
        // mainInputSearch.addEventListener('input', filterData)

        // function verifyLength(e) {

        //     if (mainInputSearch.value.length > 2) {
        //         const searchString = e.target.value.toLowerCase();
        //         filterData();
        //     }
        // }

        // function filterData(e) {

        //     figureSection.innerHTML = "";
        //     // ce que je suis entrain de chercher dans l'input
        //     const searchString = e.target.value.toLowerCase();
        //     // création d'un tableau avec ma recherche actuelle 
        //     const filterArr = recipes.filter(el =>
        //         el.name.toLowerCase().includes(searchString))

        //     createRecipesCard(filterArr)

        // }




    }
}

const app = new App();
app.AllRecepie();