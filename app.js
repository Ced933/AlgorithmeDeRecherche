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

        // console.log(dataRecipes);
        // boucler les ingrédients 
        // recipes[1].ingredients.map(ingr => {
        //     console.log(ingr.ingredient);
        // });


        // liste de tous les ingrédients

        const ulHtmlList = document.querySelector('.ul-container-list');
        function listOfIngredient() {
            // Boucle dans une boucle pour pouvoir maper les ingredients 
            recipes.map(item => {
                item.ingredients.map(item2 => {
                    const liIngred = document.createElement('li');

                    let allIngredient = item2.ingredient;
                    let setIngredient = new Set();
                    setIngredient.add(allIngredient);


                    let text = "";
                    setIngredient.forEach(function (value) {
                        text += value;
                    })
                    // for (const x of gredientUnique.values()) {
                    //     text += x;
                    // }

                    // console.log(text);

                    liIngred.innerHTML = text;
                    ulHtmlList.appendChild(liIngred);

                })
            });
        }
        listOfIngredient();

        const ulHtmlListAppliance = document.querySelector('.ul-container-list-appliance');
        function listOfAppliance() {
            // Boucle dans une boucle pour pouvoir maper les ingredients 
            recipes.map(item => {

                const liIngred = document.createElement('li');

                let allIngredient = item.appliance;
                // console.log(allIngredient);
                let setIngredient = new Set();
                setIngredient.add(allIngredient);


                let text = "";
                // setIngredient.forEach(function (value) {
                //     text += value;
                // })
                setIngredient.forEach(function (value) {
                    text += value;
                })

                // console.log(x);

                liIngred.innerHTML = text;
                ulHtmlListAppliance.appendChild(liIngred);


            });
        }
        listOfAppliance();


        const ulHtmlListUstensils = document.querySelector('.ul-container-list-ustensils');
        function listOfUstenciles() {
            // Boucle dans une boucle pour pouvoir maper les ingredients 
            recipes.map(item => {

                item.ustensils.map(itemUstensil => {
                    // console.log(itemUstensil);
                    const liIngred = document.createElement('li');

                    let allUstensils = itemUstensil;
                    let setUstensils = new Set();
                    setUstensils.add(allUstensils);

                    let text = "";

                    setUstensils.forEach(function (value) {
                        text += value;
                    })

                    // for (const x of gredientUnique.values()) {
                    //     text += x;
                    // }



                    liIngred.innerHTML = text;
                    ulHtmlListUstensils.appendChild(liIngred);

                })
            });
        }
        listOfUstenciles();





        // toutes les recettes 
        dataRecipes.recipes.forEach(recipe => {

            const Template = new RecipesCard(recipe);
            this.sectionRecipe.appendChild(Template.createRecipeCard());

        });



    }
}

const app = new App();
app.AllRecepie();