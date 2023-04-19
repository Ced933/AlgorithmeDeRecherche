


class App {
    constructor() {
        this.recetteApi = new Api('data/recette.json');
        this.sectionRecipe = document.querySelector('.figure-section');
        this.sectionInredients = document.querySelector('.container-ul');

    }


    async AllRecepie() {
        let figureSection = document.querySelector('.figure-section');
        const dataRecipes = await this.recetteApi.getApi();
        console.log(dataRecipes);
        const { recipes } = await this.recetteApi.getApi();
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



        }
        listOfIngredient();



        function listOfAppliance() {
            const ulHtmlListAppliance = document.querySelector('.ul-container-list-appliance');
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
        }
        listOfAppliance();

        function listOfUstenciles() {
            const ulHtmlListUstensils = document.querySelector('.ul-container-list-ustensils');
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
        }

        listOfUstenciles();

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

        function createTag() {
            //     // lorsqu'on clique sur un tage on doit pouvoir le faire qu'une seule fois 
            //     // c'est pour ça qu'on va creer une variable clicked et lui affecter false 
            const tagSection = document.querySelector('.tag-section');
            const allItemIngredient = document.querySelectorAll('li');

            let arrTags = [];
            allItemIngredient.forEach(li => {
                let clicked = false;
                li.addEventListener('click', e => {
                    if (clicked == false) {
                        // je recupère la valeur du li sur le quel je viens de cliquer 
                        const text = e.target.innerHTML
                        const ingredients = recipes.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x)
                        const appliances = recipes.map(item => item.appliance.toLowerCase());
                        const ustensils = recipes.map(item => item.ustensils.map(item2 => item2.toLowerCase())).flatMap(x => x);

                        const divSpan = document.createElement('div');


                        if (ingredients.includes(text)) {
                            arrTags.push({
                                // id: `${++increase}`,
                                value: text,
                                type: 'Ingrédient'
                            });
                            let arrType = arrTags.map(x => x.type);
                            if (arrType.includes('Ingrédient')) {
                                divSpan.classList.add('tag-body-ingredient');
                                // divSpan.setAttribute(id,)
                                divSpan.innerHTML = `
                                <span class="tag-span">${text}</span>
                                <img class="cross-tag" src="cross-circle.svg" alt="cross">
                            `
                                tagSection.appendChild(divSpan);
                                clicked = true;
                            }
                        }
                        else if (appliances.includes(text)) {
                            arrTags.push({
                                value: text,
                                type: 'Appareil'
                            });
                            let arrType = arrTags.map(x => x.type);
                            if (arrType.includes('Appareil')) {
                                // const divSpanAppliance = document.createElement('div');
                                divSpan.classList.add('tag-body-appliance');
                                divSpan.innerHTML = `
                                    <span class="tag-span">${text}</span>
                                    <img class="cross-tag" src="cross-circle.svg" alt="cross">
                                `
                                tagSection.appendChild(divSpan);
                                clicked = true;
                            }
                        }

                        else if (ustensils.includes(text)) {

                            arrTags.push({
                                value: text,
                                type: 'Ustensile'
                            });

                            let arrType = arrTags.map(x => x.type);
                            if (arrType.includes('Ustensile')) {
                                // const divSpanUstensil = document.createElement('div');
                                divSpan.classList.add('tag-body-ustensil');
                                divSpan.innerHTML = `
                                <span class="tag-span">${text}</span>
                                <img class="cross-tag" src="cross-circle.svg" alt="cross">
                            `
                                tagSection.appendChild(divSpan);
                                clicked = true;
                            }
                        }
                        console.log(arrTags);
                    }
                    else {
                        console.log('vous avez déja cliquer sur ce bouton');
                    }

                    // ----------------------------------- SUPPRIMER UN TAG ---------------------------------

                    const crosses = document.querySelectorAll('.cross-tag');
                    let i;
                    for (i = 0; i < crosses.length; i++) {
                        crosses[i].onclick = function (e) {

                            // le tag actuel 
                            let spanClicked = e.target.parentElement;
                            // supprimer le tag dans le dom 
                            spanClicked.remove();
                            console.log(spanClicked);
                            // le mot à l'intérieur du span 
                            let spanInside = spanClicked.querySelector('.tag-span').innerHTML;
                            console.log(spanInside);
                            console.log(arrTags);

                            //    supprimer dans le tableau l'élément qu'on supprime en tag 
                            arrTags = arrTags.filter((tag) => tag.value.toLowerCase() !== spanInside.toLowerCase())
                            clicked = false;
                            console.log(arrTags);

                            let filterTagMulti = recipes.filter(el => {
                                // je compare mon tableau avec mes tag selectionné à tous les tableau ustensils de chaque recette 
                                return arrTags.map(item => item.value).every(i => el.appliance.toLowerCase().includes(i) || el.ustensils.includes(i) || el.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(i))
                                // filterArrUstensils.push(el);

                            });

                            console.log(filterTagMulti);
                            figureSection.innerHTML = "";
                            createRecipesCard(filterTagMulti);
                        }
                    }

                    let filterTagMulti = recipes.filter(el => {
                        // je compare mon tableau avec mes tag selectionné à tous les tableau ustensils de chaque recette 
                        return arrTags.map(item => item.value).every(i => el.appliance.toLowerCase().includes(i) || el.ustensils.includes(i) || el.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(i))
                    });
                    if (filterTagMulti.length === 0) {

                        // let h2NoResultTag = document.createElement('h3');
                        // h2NoResultTag.innerHTML = "Aucun resultat trouvé !";
                        // figureSection.appendChild(h2NoResultTag)
                        console.log("Aucun resultat trouvé");
                    }
                    console.log(filterTagMulti);
                    figureSection.innerHTML = "";
                    createRecipesCard(filterTagMulti);
                })
            })
        }
        createTag();
    }
}

const app = new App();
app.AllRecepie();