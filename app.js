class App {
    constructor() {
        this.recetteApi = new Api('data/recette.json');
        this.sectionRecipe = document.querySelector('.figure-section');
        this.sectionInredients = document.querySelector('.container-ul');
        this.arrTags = [];
    }

    // refresh() {
    //     console.log('ok')
    // }
    async AllProject() {
        let figureSection = document.querySelector('.figure-section');
        const dataRecipes = await this.recetteApi.getApi();
        console.log(dataRecipes);
        const { recipes } = await this.recetteApi.getApi();
        // this.refresh();
        function createRecipesCard(listRecipe) {
            listRecipe.forEach(recipe => {
                const recipeFigure = document.createElement('figure');
                recipeFigure.classList.add('figure');
                recipeFigure.innerHTML = ` 
                <figcaption class="figcaption">
                <div class="div-title-span">
                    <h3 class="h3-recipe">${recipe.name}</h3>
                    <span><i class="fa-regular fa-clock me-2"></i>${recipe.time} min</span>
                </div>
                <div class="div-describe-p">
                
                    <p class="p-ingredients">${recipe.ingredients.map(el => el.ingredient + ":" + el.quantity + "<br>")} </p>
                    <p class="p-describe">${recipe.description}</p>
                </div>
            </figcaption>`
                figureSection.appendChild(recipeFigure);
            })
        }
        createRecipesCard(recipes);

        let arrTags = [];

        const ulHtmlList = document.querySelector('.ul-container-list');
        // Boucle dans une boucle pour pouvoir maper les ingredients 
        // flatMap  sert a desctructurer les tableaux à l'interieur d'un tableau et les meme tous au meme niveau dans un tableau  

        function listOfIngredients() {
            const ingredients = recipes.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x)

            // Je mets ingrédients dans set pour avoir chaque valeur une seul fois 
            let setIngredient = new Set(ingredients);

            // je boucle le Set
            setIngredient.forEach(function (value) {

                let liIngredient = document.createElement('li');
                liIngredient.innerHTML = value;
                liIngredient.classList.add('li-ingredient');
                // a l'intérieur du ul je mets tous mes li 

                ulHtmlList.appendChild(liIngredient);
            });

        }

        listOfIngredients();


        // Filtrer avec recherche clavier 
        const ingredientInputSearch = document.querySelector('#search-ingredient');
        ingredientInputSearch.addEventListener('input', filterIngredient);
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


        const ulHtmlListAppliance = document.querySelector('.ul-container-list-appliance');
        function listOfAppliances() {

            const appliances = recipes.map(item => item.appliance.toLowerCase());
            let setAppliance = new Set(appliances);

            setAppliance.forEach(function (value) {
                let liAppareil = document.createElement('li');
                liAppareil.innerHTML = value;
                liAppareil.classList.add('li-appliance');
                ulHtmlListAppliance.appendChild(liAppareil);
            });


            const tagSection = document.querySelector('.tag-section');
        }
        listOfAppliances();


        // Filtrer Appliance clavier 

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


        const ulHtmlListUstensils = document.querySelector('.ul-container-list-ustensils');
        function listOfUstenciles() {
            const ustensils = recipes.map(item => item.ustensils.map(item2 => item2.toLowerCase())).flatMap(x => x);
            let setUstensils = new Set(ustensils);
            setUstensils.forEach(function (value) {
                let liUstensil = document.createElement('li');
                liUstensil.innerHTML = value;
                liUstensil.classList.add('li-ustensil');
                ulHtmlListUstensils.appendChild(liUstensil);
            });
        }

        listOfUstenciles();

        // Recherche USTENSILS clavier 

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

        let mainInputSearch = document.querySelector('#search-main');
        function noResult() {
            const h2NoResult = document.createElement('h2');
            h2NoResult.innerHTML = "Aucun resultat trouvé pour " + mainInputSearch.value + "!";
            figureSection.appendChild(h2NoResult)
        }
        // a cahque fois qu'on ecrit a l'intérieur du input ça déclanche notre fonction filterData
        mainInputSearch.addEventListener('input', filterData)

        function filterData(e) {
            if (mainInputSearch.value.length >= 3) {
                figureSection.innerHTML = "";
                // ce que je suis entrain de chercher dans l'input
                const searchString = e.target.value.toLowerCase();
                // création d'un tableau avec ma recherche actuelle 
                let filterArrName = recipes.filter(el =>
                    el.name.toLowerCase().includes(searchString) || el.description.toLowerCase().includes(searchString) || el.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(searchString))
                console.log(filterArrName);
                createRecipesCard(filterArrName);
                // si la recherche est superieur à 2 carractere alors tu peux verifier si elle fait partie des 3 filtres
                // si la recherche correspond à rien alors tu actives la fonction no result qui affichera aucun resultat trouvé 

            }
            // lorsqu'on trouve rien  message d'erreur apparait 
            if (figureSection.innerHTML == "") {

                noResult();

            }
            // lorsque il n'y a plus rien dans l'input recherche 
            if (mainInputSearch.value.length === 0) {

                figureSection.innerHTML = "";
                createRecipesCard(recipes)
            }
        }
        // permet de cliquer sur les autres tags apres avoir cliqué sur un premier tag 
        const UlContain = document.querySelectorAll('ul');
        UlContain.forEach(ul => {
            ul.addEventListener('change', (e) => {
                createTag();
                console.log(e)
            })
        });




        function createTag() {
            // const UlContain = document.querySelector('ul');
            const allItemIngredient = document.querySelectorAll('li');
            const tagSection = document.querySelector('.tag-section');


            for (let x = 0; x < allItemIngredient.length; x++) {
                allItemIngredient[x].onclick = function (e) {

                    // lorsqu'on clique sur un tag on doit pouvoir le faire qu'une seule fois 
                    // c'est pour ça qu'on va creer une variable clicked et lui affecter false 
                    let clicked = false;
                    const text = e.target.innerHTML

                    const ingredients = recipes.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x)
                    const appliances = recipes.map(item => item.appliance.toLowerCase());
                    const ustensils = recipes.map(item => item.ustensils.map(item2 => item2.toLowerCase())).flatMap(x => x);

                    const divSpan = document.createElement('div');
                    console.log(arrTags);
                    console.log(text);
                    function isTextAlreadyExistInArrTag(itemThatWeClickOn) {
                        //   vérification si l'élément sur lequel on va cliquer existe déja dans arrTag
                        for (let i = 0; i < arrTags.length; i++) {
                            if (arrTags[i].value === itemThatWeClickOn) {
                                console.log('vous avez déja cliqué sur ce tag')
                                clicked = true;

                            }
                        }
                    }
                    isTextAlreadyExistInArrTag(text);

                    // si il existe pas alors on peut le creer  

                    if (clicked === false) {
                        // si ce sur quoi on a cliqué fait parti de la liste de nos ingrédients alors 
                        // tu exécutes cette fonction ainsi de suite
                        function isItAnIngredient(text) {

                            if (ingredients.includes(text)) {
                                arrTags.push({

                                    value: text,
                                    type: 'Ingrédient'
                                });
                                // vérifier son type pour lui attribuer une couleur 
                                let arrType = arrTags.map(x => x.type);
                                if (arrType.includes('Ingrédient')) {
                                    divSpan.classList.add('tag-body-ingredient');

                                    divSpan.innerHTML = `
                                                <span class="tag-span">${text}</span>
                                                <img class="cross-tag" src="cross-circle.svg" alt="cross">
                                            `
                                    tagSection.appendChild(divSpan);
                                    clicked = true;
                                    console.log(clicked);
                                }


                            }
                        }
                        isItAnIngredient(text);

                        function isItAnAppliance(text) {

                            if (appliances.includes(text)) {
                                arrTags.push({
                                    value: text,
                                    type: 'Appareil'
                                });
                                let arrType = arrTags.map(x => x.type);
                                if (arrType.includes('Appareil')) {

                                    divSpan.classList.add('tag-body-appliance');
                                    divSpan.innerHTML = `
                                                   <span class="tag-span">${text}</span>
                                                   <img class="cross-tag" src="cross-circle.svg" alt="cross">
                                               `
                                    tagSection.appendChild(divSpan);

                                    console.log(clicked);
                                }
                            }
                        }
                        isItAnAppliance(text);

                        function isItAnUstensil(text) {
                            if (ustensils.includes(text)) {

                                arrTags.push({
                                    value: text,
                                    type: 'Ustensile'
                                });

                                let arrType = arrTags.map(x => x.type);
                                if (arrType.includes('Ustensile')) {

                                    divSpan.classList.add('tag-body-ustensil');
                                    divSpan.innerHTML = `
                                                                      <span class="tag-span">${text}</span>
                                                                      <img class="cross-tag" src="cross-circle.svg" alt="cross">
                                                                  `
                                    tagSection.appendChild(divSpan);

                                }

                            }
                        }
                        isItAnUstensil(text);
                    }


                    let filterTagMulti = recipes.filter(el => {
                        // je compare mon tableau avec mes tag selectionné à tous les tableaux ingrédient ustensils et appliance de chaque recette 
                        // i c'est tous les élément de arrtag
                        return arrTags.map(item => item.value).every(i => el.appliance.toLowerCase().includes(i) || el.ustensils.includes(i) || el.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(i))
                    });

                    // test 
                    // je mets ingrédients dans set pour avoir chaque valeur une seul fois 
                    //    ------
                    // let newIngredientList = filterTagMulti.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x);
                    // let setNewListIngredient = new Set(newIngredientList);

                    // for (let i = 0; i < arrTags.length; ++i) {
                    //     ulHtmlList.innerHTML = "";
                    //     listOfIngredients(setNewListIngredient);
                    //     console.log('The waterrrr');

                    // }

                    // ------------------



                    // FONCTION pour rafraîchir 


                    // function refreshListIngredient() {

                    //     let newIngredientList = filterTagMulti.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x);
                    //     let setNewListIngredient = new Set(newIngredientList);
                    //     ulHtmlList.innerHTML = "";
                    //     setNewListIngredient.forEach(function (value) {
                    //         let liIngredient = document.createElement('li');
                    //         liIngredient.classList.add('li-ingredient');
                    //         liIngredient.innerHTML = value;
                    //         ulHtmlList.appendChild(liIngredient);
                    //     });
                    // }
                    // function refreshListAppliance() {
                    //     let newAppliance = filterTagMulti.map(item => item.appliance.toLowerCase());
                    //     let setNewListAppliance = new Set(newAppliance);
                    //     ulHtmlListAppliance.innerHTML = "";
                    //     setNewListAppliance.forEach(function (value) {
                    //         let liAppliance = document.createElement('li');
                    //         liAppliance.classList.add('li-appliance');
                    //         liAppliance.innerHTML = value;
                    //         ulHtmlListAppliance.appendChild(liAppliance);
                    //     });

                    // }
                    // function refreshListUstensil() {

                    //     let newUstensil = filterTagMulti.map(item => item.ustensils.map(item2 => item2.toLowerCase())).flatMap(x => x);

                    //     let setNewListUstensil = new Set(newUstensil);
                    //     ulHtmlListUstensils.innerHTML = "";
                    //     setNewListUstensil.forEach(function (value) {
                    //         let liUstensil = document.createElement('li');
                    //         liUstensil.classList.add('li-ustensil');
                    //         liUstensil.innerHTML = value;
                    //         ulHtmlListUstensils.appendChild(liUstensil);
                    //     });
                    // }
                    // refreshListIngredient();
                    // refreshListAppliance();
                    // refreshListUstensil();

                    //             // je boucle le Set
                    //             // a l'intérieur du ul je mets tous mes li 




                    console.log(filterTagMulti);
                    figureSection.innerHTML = "";
                    createRecipesCard(filterTagMulti);


                    // Supprimer un tag 
                    const crosses = document.querySelectorAll('.cross-tag');

                    for (let i = 0; i < crosses.length; i++) {
                        crosses[i].onclick = function (e) {
                            clicked = false;
                            // le tag actuel 
                            let spanClicked = e.target.parentElement;
                            // supprimer le tag dans le dom 
                            spanClicked.remove();
                            // spanClicked.style.display = "none";
                            console.log(spanClicked);
                            // le mot à l'intérieur du span 
                            let spanInside = spanClicked.querySelector('.tag-span').innerHTML;
                            console.log(spanInside);
                            console.log(arrTags);

                            //    supprimer dans le tableau l'élément qu'on supprime en tag 
                            arrTags = arrTags.filter((tag) => tag.value.toLowerCase() !== spanInside.toLowerCase())
                            // clicked = false;
                            console.log(arrTags);

                            let filterTagMulti = recipes.filter(el => {
                                // je compare mon tableau avec mes tag selectionné à tous les tableau ustensils de chaque recette 
                                return arrTags.map(item => item.value).every(i => el.appliance.toLowerCase().includes(i) || el.ustensils.includes(i) || el.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(i))
                                // filterArrUstensils.push(el);
                            });
                            console.log(filterTagMulti);


                            // function refreshIngredientListClicked() {
                            //     // on filtre les ingédient restant par rapport au tableau multitag
                            //     let newIngredientList = filterTagMulti.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x);
                            //     let setNewListIngredient = new Set(newIngredientList);

                            //     ulHtmlList.innerHTML = "";
                            //     //             // je boucle le Set
                            //     setNewListIngredient.forEach(function (value) {
                            //         let liIngredient = document.createElement('li');
                            //         liIngredient.classList.add('li-ingredient');
                            //         liIngredient.innerHTML = value;
                            //         ulHtmlList.appendChild(liIngredient);
                            //     });
                            // }
                            // function refreshApplianceListClicked() {
                            //     let newAppliance = filterTagMulti.map(item => item.appliance.toLowerCase());
                            //     let setNewListAppliance = new Set(newAppliance);
                            //     ulHtmlListAppliance.innerHTML = "";

                            //     setNewListAppliance.forEach(function (value) {
                            //         let liAppliance = document.createElement('li');
                            //         liAppliance.classList.add('li-appliance');
                            //         liAppliance.innerHTML = value;
                            //         ulHtmlListAppliance.appendChild(liAppliance);
                            //     });

                            // }

                            // function refreshUstensilListClicked() {
                            //     let newUstensil = filterTagMulti.map(item => item.ustensils.map(item2 => item2.toLowerCase())).flatMap(x => x);
                            //     let setNewListUstensil = new Set(newUstensil);

                            //     ulHtmlListUstensils.innerHTML = "";
                            //     setNewListUstensil.forEach(function (value) {
                            //         let liUstensil = document.createElement('li');
                            //         liUstensil.classList.add('li-ustensil');
                            //         liUstensil.innerHTML = value;
                            //         ulHtmlListUstensils.appendChild(liUstensil);
                            //     });
                            // }

                            // refreshIngredientListClicked();
                            // refreshApplianceListClicked();
                            // refreshUstensilListClicked();


                            figureSection.innerHTML = "";

                            createRecipesCard(filterTagMulti);
                        }
                    }
                }
            }
        }
        createTag();


    }
}

const app = new App();
app.AllProject();