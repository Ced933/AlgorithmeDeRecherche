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

        // destructuring  pour avoir que le tableau des recette et non pas plusieur index 
        const { recipes } = await this.recetteApi.getApi();

        console.log(recipes);
        // boucler les ingrédients 
        // recipes[1].ingredients.map(ingr => {
        //     console.log(ingr.ingredient);
        // });

        let figureSection = document.querySelector('.figure-section');
        // liste de tous les ingrédients
        let arrTag = [];

        function getSpanValue() {
            const AllTag = document.querySelector('.tag-span-appliance').innerHTML;
            if (AllTag === 'Blender') {
                figureSection.innerHTML = "";

                // ce que je suis entrain de chercher dans l'input
                const searchString = 'Blender';
                // création d'un tableau avec ma recherche actuelle 
                const filterArr = recipes.filter(el =>
                    el.appliance.includes(searchString))
                console.log(filterArr);
                createRecipesCard(filterArr)



            }
            // arrTag.forEach(span => {

            //     arrTag.push(span.textContent);
            // })
            // console.log(arrTag)

            // // AllTag.push(arrTag);
            // console.log(AllTag);

        }
        getSpanValue();

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
            const allItemIngredient = document.querySelectorAll('.li-ingredient');
            const tagSection = document.querySelector('.tag-section');


            function createTag() {
                // lorsqu'on clique sur un tage on doit pouvoir le faire qu'une seule fois 
                // c'est pour ça qu'on va creer une variable clicked et lui affecter false 


                allItemIngredient.forEach(li => {

                    let clicked = false;
                    li.addEventListener('click', e => {
                        if (clicked == false) {
                            // je recupère la valeur du li sur le quel je viens de cliquer 
                            const text = e.target.innerHTML
                            // je crée mon tag 
                            const divSpan = document.createElement('div');
                            divSpan.classList.add('tag-body-ingredient');
                            divSpan.innerHTML = `
                                <span class="tag-span-ingredient">${text}</span>
                                <img class="cross-tag" src="cross-circle.svg" alt="cross">
                            `
                            tagSection.appendChild(divSpan);
                            // si on a passé cette étape c'est que c'est la premieere fois quon clique sur le li 
                            // notre clicked vaut true maintenant 
                            clicked = true;
                            const crosses = document.querySelectorAll('.cross-tag');

                            crosses.forEach(cross => {

                                cross.addEventListener('click', () => {
                                    // lorsque je clique sur la croix elle efface mon tag et reinitialise 
                                    // la variable a false  on va donc pouvoir recliquer dessus
                                    divSpan.style.display = 'none';

                                    clicked = false;

                                })
                            })

                        }
                        else {
                            console.log('vous avez déja cliquer sur ce bouton');
                        }
                    })
                })
            }
            createTag();
            // return setIngredient;
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
            const allItem = document.querySelectorAll('.li-appliance');
            const tagSection = document.querySelector('.tag-section');

            //                     const cible = e.target
            // console.log()
            function createTag() {
                // lorsqu'on clique sur un tage on doit pouvoir le faire qu'une seule fois 
                // c'est pour ça qu'on va creer une variable clicked et lui affecter false 


                allItem.forEach(li => {

                    let clicked = false;
                    li.addEventListener('click', e => {
                        if (clicked == false) {
                            // je recupère la valeur du li sur le quel je viens de cliquer 
                            const text = e.target.innerHTML
                            // je crée mon tag 
                            const divSpan = document.createElement('div');
                            divSpan.classList.add('tag-body-appliance');
                            divSpan.innerHTML = `
                                <span class="tag-span-ingredient">${text}</span>
                                <img class="cross-tag" src="cross-circle.svg" alt="cross">
                            `
                            tagSection.appendChild(divSpan);

                            // si on a passé cette étape c'est que c'est la premieere fois quon clique sur le li 
                            // notre clicked vaut true maintenant 
                            clicked = true;
                            const crosses = document.querySelectorAll('.cross-tag');

                            crosses.forEach(cross => {

                                cross.addEventListener('click', () => {
                                    // lorsque je clique sur la croix elle efface mon tag et reinitialise 
                                    // la variable a false  on va donc pouvoir recliquer dessus
                                    divSpan.style.display = 'none';
                                    clicked = false;


                                })
                            })

                        }
                        else {
                            console.log('vous avez déja cliquer sur ce bouton');
                        }


                    })
                })
            }
            createTag();
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
            const allItemUstensil = document.querySelectorAll('.li-ustensil');
            const tagSection = document.querySelector('.tag-section');

            //                     const cible = e.target
            // console.log()
            function createTag() {
                // lorsqu'on clique sur un tage on doit pouvoir le faire qu'une seule fois 
                // c'est pour ça qu'on va creer une variable clicked et lui affecter false 


                allItemUstensil.forEach(li => {

                    let clicked = false;
                    li.addEventListener('click', e => {
                        if (clicked == false) {
                            // je recupère la valeur du li sur le quel je viens de cliquer 
                            const text = e.target.innerHTML
                            // je crée mon tag 
                            const divSpan = document.createElement('div');
                            divSpan.classList.add('tag-body-ustensil');
                            divSpan.innerHTML = `
                                <span class="tag-span-ingredient">${text}</span>
                                <img class="cross-tag" src="cross-circle.svg" alt="cross">
                            `
                            tagSection.appendChild(divSpan);
                            // si on a passé cette étape c'est que c'est la premieere fois quon clique sur le li 
                            // notre clicked vaut true maintenant 
                            clicked = true;
                            const crosses = document.querySelectorAll('.cross-tag');

                            crosses.forEach(cross => {

                                cross.addEventListener('click', () => {
                                    // lorsque je clique sur la croix elle efface mon tag et reinitialise 
                                    // la variable a false  on va donc pouvoir recliquer dessus
                                    divSpan.style.display = 'none';

                                    clicked = false;
                                })
                            })

                        }
                        else {
                            console.log('vous avez déja cliquer sur ce bouton');
                        }


                    })
                })
            }
            createTag();
        }
        listOfUstenciles();





        // toutes les recettes 
        // dataRecipes.recipes.forEach(recipe => {

        //     const Template = new RecipesCard(recipe);
        //     this.sectionRecipe.appendChild(Template.createRecipeCard());

        // });
        // let figureSection = document.querySelector('.figure-section');
        let mainInputSearch = document.querySelector('#search-main');

        let dataArray;
        async function getRecipes() {


            createRecipesCard(recipes);
        }
        // getRecipes();

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

        // // function verifyLength(e) {

        // //     if (mainInputSearch.value.length > 2) {
        // //         const searchString = e.target.value.toLowerCase();
        // //         filterData();
        // //     }
        // // }

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