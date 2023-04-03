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
        // let arrTag = [];

        // function getSpanValue() {
        //     const AllTag = document.querySelector('.tag-span-appliance').innerHTML;
        //     if (AllTag === 'Blender') {
        //         figureSection.innerHTML = "";

        //         // ce que je suis entrain de chercher dans l'input
        //         const searchString = 'Blender';
        //         // création d'un tableau avec ma recherche actuelle 
        //         const filterArr = recipes.filter(el =>
        //             el.appliance.includes(searchString))
        //         console.log(filterArr);
        //         createRecipesCard(filterArr)



        //     }


        // }
        // getSpanValue();

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
                            const divSpanIngredient = document.createElement('div');
                            divSpanIngredient.classList.add('tag-body-ingredient');
                            divSpanIngredient.innerHTML = `
                                <span class="tag-span-ingredient">${text}</span>
                                <img class="cross-tag" src="cross-circle.svg" alt="cross">
                            `
                            tagSection.appendChild(divSpanIngredient);
                            // si on a passé cette étape c'est que c'est la premieere fois quon clique sur le li 
                            // notre clicked vaut true maintenant 
                            clicked = true;
                            const crosses = document.querySelectorAll('.cross-tag');

                            crosses.forEach(cross => {

                                cross.addEventListener('click', () => {
                                    // lorsque je clique sur la croix elle efface mon tag et reinitialise 
                                    // la variable a false  on va donc pouvoir recliquer dessus
                                    divSpanIngredient.style.display = 'none';

                                    clicked = false;
                                    figureSection.innerHTML = "";
                                    createRecipesCard(recipes);

                                })
                            })
                            function getSpanValue() {

                                if (text) {
                                    figureSection.innerHTML = "";

                                    const filterArrIngredient = [];
                                    recipes.map(el => {

                                        if (el.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase() === text)) {
                                            filterArrIngredient.push(el);
                                        }

                                    })


                                    console.log(filterArrIngredient);

                                    // const filterArr = recipes.map(el =>
                                    //     el.ingredients.filter(item => item.ingredient.toLowerCase().includes(text))).flatMap(x => x)
                                    // console.log();


                                    createRecipesCard(filterArrIngredient);
                                    // spanCreate = true;


                                }


                            }


                            getSpanValue();

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
                    // pour pas cliquer sur l'item deux fois 
                    let clicked = false;
                    // let spanCreate = false;
                    li.addEventListener('click', e => {

                        if (clicked == false) {
                            // je recupère la valeur du li sur le quel je viens de cliquer 
                            const text = e.target.innerHTML
                            // je crée mon tag 
                            const divSpan = document.createElement('div');
                            divSpan.classList.add('tag-body-appliance');
                            divSpan.innerHTML = `
                                <span class="tag-span-appliance">${text}</span>
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
                                    // vu qu'on le supprime alors on peut le reinitialiser a false 
                                    clicked = false;
                                    // je vide figure section pour eviter que les createRecipesCard s'accumule c'est a dire 50 + 50 etc 
                                    figureSection.innerHTML = "";
                                    // je recrée les 50 recette a chaque fois que je ferme un tag pour revenir a toutes les recettes
                                    createRecipesCard(recipes);

                                })
                            })
                            // if (divSpan.indexOf() < 2) {
                            //     alert('on a atteint le max')
                            // }

                            // if (spanCreate == false) {
                            function getSpanValue() {
                                // const AllTag = document.querySelector('.tag-span-appliance');
                                // const innerTextOfSpan = AllTag.innerHTML;
                                // console.log(innerTextOfSpan);
                                if (text) {
                                    figureSection.innerHTML = "";

                                    // ce que je suis entrain de chercher dans l'input
                                    // const searchString = text;
                                    // création d'un tableau avec ma recherche actuelle 
                                    const filterArr = recipes.filter(el =>
                                        el.appliance.toLowerCase().includes(text))
                                    console.log(filterArr);
                                    createRecipesCard(filterArr);
                                    // spanCreate = true;


                                }


                            }


                            getSpanValue();
                            //     spanCreate = true;
                            //     console.log(spanCreate)
                            // }
                            // else ("vous pouvez selectionner qu'un tag")

                            // getRecipes();

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
                            let Alltext = [];
                            while (Alltext < text) {

                                Alltext.unshift(text)
                            }

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
                                    figureSection.innerHTML = "";
                                    createRecipesCard(recipes);


                                    clicked = false;
                                })
                            })

                            // function getSpanValue() {

                            //     if (text) {
                            //         figureSection.innerHTML = "";

                            //         const filterArrUstensil = recipes.map(x => x.ustensils.includes(text));
                            //         console.log(filterArrUstensil);
                            //         // let list = 0;
                            //         // list = [...recipes].indexOf(li)
                            //         // console.log(list);

                            //         // const filterArr = recipes.map(el =>
                            //         //     el.ingredients.filter(item => item.ingredient.toLowerCase().includes(text))).flatMap(x => x)
                            //         // console.log();


                            //         // createRecipesCard(filterArrUstensil);
                            //         // spanCreate = true;


                            //     }


                            // }
                            function getSpanValue() {
                                // let Alltext = [];

                                // for (let i = 0; i < text.length; i++) {
                                //     Alltext.push(text[i])
                                // }


                                if (Alltext) {
                                    console.log(Alltext);
                                    figureSection.innerHTML = "";

                                    const filterArrUstensils = [];
                                    recipes.map(el => {

                                        if (el.ustensils.some((ustensil) => ustensil.toLowerCase() === text)) {
                                            filterArrUstensils.push(el);
                                        }

                                    })


                                    console.log(filterArrUstensils);

                                    // const filterArr = recipes.map(el =>
                                    //     el.ingredients.filter(item => item.ingredient.toLowerCase().includes(text))).flatMap(x => x)
                                    // console.log();


                                    createRecipesCard(filterArrUstensils);
                                    // spanCreate = true;


                                }


                            }
                            getSpanValue()
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
        function getRecipes() {


            createRecipesCard(recipes);
        }
        getRecipes();

        // console.log(dataRecipes);

        function createRecipesCard(listRecipe) {

            listRecipe.forEach(recipe => {
                // console.log(recipe);
                const recipeFigure = document.createElement('figure');
                recipeFigure.classList.add('figure');
                recipeFigure.innerHTML = ` 
                <figcaption class="figcaption">
                <div class="div-title-span">
                    <h3>${recipe.name}</h3>
                    <span><i class="fa-regular fa-clock me-2"></i>${recipe.time} min</span>
                </div>
                <div class="div-describe-p">
                    <p class="p-ingredients">${recipe.ingredients.map(el => el.ingredient)} : ${recipe.ingredients.map(quanti => quanti.quantity)}</p>
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

        function noResult() {
            const h2NoResult = document.createElement('h2');
            h2NoResult.innerHTML = "Aucun resultat trouvé pour " + mainInputSearch.value + "!";
            figureSection.appendChild(h2NoResult)

        }
        // a cahque fois qu'on ecrit a l'intérieur du input ça déclanche notre fonction filterData
        mainInputSearch.addEventListener('input', filterData)

        // function verifyLength(e) {

        //     if (mainInputSearch.value.length > 2) {
        //         const searchString = e.target.value.toLowerCase();
        //         filterData();
        //     }
        // }

        function filterData(e) {

            if (mainInputSearch.value.length >= 3) {


                figureSection.innerHTML = "";
                // ce que je suis entrain de chercher dans l'input
                const searchString = e.target.value.toLowerCase();
                // création d'un tableau avec ma recherche actuelle 
                const filterArrName = recipes.filter(el =>
                    el.name.toLowerCase().includes(searchString))

                createRecipesCard(filterArrName);
                // filtrer par description 
                const filterArrDescription = recipes.filter(el =>
                    el.description.toLowerCase().includes(searchString))

                createRecipesCard(filterArrDescription)
                // filtrer par ingrédients
                const filterArrIngredient = [];
                const filterArrayIngredient = recipes.map(el => {

                    if (el.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase() === searchString)) {
                        filterArrIngredient.push(el);

                    }
                });

                createRecipesCard(filterArrIngredient)
                // si la recherche est superieur à 2 carractere alors tu peux verifier si elle fait partie des 3 filtres

                // si la recherche correspond à rien alors tu actives la fonction no result qui affichera aucun resultat trouvé 
                if (filterArrName && filterArrDescription && filterArrIngredient == false) {
                    noResult();

                }
            }
            else if (mainInputSearch.value.length === 0) {

                figureSection.innerHTML = "";
                createRecipesCard(recipes)
            }
        }




    }
}

const app = new App();
app.AllRecepie();