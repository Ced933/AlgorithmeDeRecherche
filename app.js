class App {
    constructor() {
        this.recetteApi = new Api('data/recette.json');
        this.sectionRecipe = document.querySelector('.figure-section');
        this.sectionInredients = document.querySelector('.container-ul');
        this.arrTags = [];
        this.ingredients = []
        this.appliances = []
        this.ustensils = []
        this.arrTags = [];
    }

    // refresh() {
    //     console.log('ok')
    // }
    async init() {
        this.figureSection = document.querySelector('.figure-section');
        const dataRecipes = await this.recetteApi.getApi();
        console.log(dataRecipes);
        this.recipes = dataRecipes.recipes
        this.createRecipesCard(this.recipes);
        this.listOfIngredients();
        const ingredientInputSearch = document.querySelector('#search-ingredient');
        this.crosses = document.querySelectorAll('.cross-tag');
        ingredientInputSearch.addEventListener('input', this.filterIngredient);
        this.listOfAppliances();
        const searchInputAppliance = document.querySelector('#search-appliance');
        searchInputAppliance.addEventListener("input", this.filterAppliance)
        const searchInputUstensil = document.querySelector('#search-ustensils');
        searchInputUstensil.addEventListener("input", this.filterUstensil)
        this.clicked = false;
        this.listOfUstenciles();
        const mainInputSearch = document.querySelector('#search-main');
        mainInputSearch.addEventListener('input', this.filterData)
        // permet de cliquer sur les autres tags apres avoir cliqué sur un premier tag 
        const UlContain = document.querySelectorAll('ul');
        UlContain.forEach(ul => {
            ul.addEventListener('click', (e) => {
                this.createTag();
                console.log(e)
            })
        });
        this.createTag();
        // console.log(this.crosses);

        // for (let i = 0; i < this.crosses.length; i++) {
        //     this.crosses[i].addEventListener('click', (e) => {
        //         console.log(this.crosses[i]);

        //     });
        //     // console.log(crosses[i]);
        // }
    }
    // this.refresh();
    createRecipesCard(listRecipe) {
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
            this.figureSection.appendChild(recipeFigure);
        })
    }

    listOfIngredients() {
        const ingredients = this.recipes.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x)

        // Je mets ingrédients dans set pour avoir chaque valeur une seul fois 
        let setIngredient = new Set(ingredients);

        const ulHtmlList = document.querySelector('.ul-container-list');
        // je boucle le Set
        setIngredient.forEach((value) => {

            let liIngredient = document.createElement('li');
            liIngredient.innerHTML = value;
            liIngredient.classList.add('li-ingredient');
            // a l'intérieur du ul je mets tous mes li 

            ulHtmlList.appendChild(liIngredient);
        });

    }

    filterIngredient() {
        const ingredientInputSearch = document.querySelector('#search-ingredient');
        const filterIngr = ingredientInputSearch.value.toLowerCase();
        console.log(filterIngr);
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


    listOfAppliances() {

        const ulHtmlListAppliance = document.querySelector('.ul-container-list-appliance');
        const appliances = this.recipes.map(item => item.appliance.toLowerCase());
        let setAppliance = new Set(appliances);

        setAppliance.forEach((value) => {
            let liAppareil = document.createElement('li');
            liAppareil.innerHTML = value;
            liAppareil.classList.add('li-appliance');
            ulHtmlListAppliance.appendChild(liAppareil);
        });
    }




    filterAppliance() {

        const searchInputAppliance = document.querySelector('#search-appliance');
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


    listOfUstenciles() {
        const ulHtmlListUstensils = document.querySelector('.ul-container-list-ustensils');
        const ustensils = this.recipes.map(item => item.ustensils.map(item2 => item2.toLowerCase())).flatMap(x => x);
        let setUstensils = new Set(ustensils);
        setUstensils.forEach((value) => {
            let liUstensil = document.createElement('li');
            liUstensil.innerHTML = value;
            liUstensil.classList.add('li-ustensil');
            ulHtmlListUstensils.appendChild(liUstensil);
        });
    }

    filterUstensil() {
        const searchInputUstensil = document.querySelector('#search-ustensils');
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

    noResult() {
        let mainInputSearch = document.querySelector('#search-main');
        const h2NoResult = document.createElement('h2');
        h2NoResult.innerHTML = "Aucun resultat trouvé pour " + mainInputSearch.value + "!";
        this.figureSection.appendChild(h2NoResult)
    }

    filterData(e) {
        if (mainInputSearch.value.length >= 3) {
            this.figureSection.innerHTML = "";
            // ce que je suis entrain de chercher dans l'input
            const searchString = e.target.value.toLowerCase();
            // création d'un tableau avec ma recherche actuelle 
            let filterArrName = this.recipes.filter(el =>
                el.name.toLowerCase().includes(searchString) || el.description.toLowerCase().includes(searchString) || el.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(searchString))
            console.log(filterArrName);
            this.createRecipesCard(filterArrName);
            // si la recherche est superieur à 2 carractere alors tu peux verifier si elle fait partie des 3 filtres
            // si la recherche correspond à rien alors tu actives la fonction no result qui affichera aucun resultat trouvé 

        }
        // lorsqu'on trouve rien  message d'erreur apparait 
        if (figureSection.innerHTML == "") {

            this.noResult();

        }
        // lorsque il n'y a plus rien dans l'input recherche 
        if (mainInputSearch.value.length === 0) {

            figureSection.innerHTML = "";
            this.createRecipesCard(recipes)
        }
    }

    isItAnIngredient(text) {

        if (this.ingredients.includes(text)) {
            this.arrTags.push({

                value: text,
                type: 'Ingrédient'
            });
            // vérifier son type pour lui attribuer une couleur 
            let arrType = this.arrTags.map(x => x.type);
            if (arrType.includes('Ingrédient')) {
                const divSpan = document.createElement('div');
                const tagSection = document.querySelector('.tag-section');
                divSpan.classList.add('tag-body-ingredient');
                divSpan.innerHTML = `
                                <span class="tag-span">${text}</span>
                                <img class="cross-tag" src="cross-circle.svg" alt="cross">
                            `
                tagSection.appendChild(divSpan);
                // this.clicked = true;

                console.log('les meilleuresssss')
            }
            console.log('Amen')
        }
    }

    isItAnAppliance(text) {

        if (this.appliances.includes(text)) {
            this.arrTags.push({
                value: text,
                type: 'Appareil'
            });
            let arrType = this.arrTags.map(x => x.type);
            if (arrType.includes('Appareil')) {
                const divSpan = document.createElement('div');
                const tagSection = document.querySelector('.tag-section');
                divSpan.classList.add('tag-body-appliance');
                divSpan.innerHTML = `
                                   <span class="tag-span">${text}</span>
                                   <img class="cross-tag" src="cross-circle.svg" alt="cross">
                               `
                tagSection.appendChild(divSpan);

                console.log(this.clicked);
            }
        }
    }

    isItAnUstensil(text) {

        if (this.ustensils.includes(text)) {

            this.arrTags.push({
                value: text,
                type: 'Ustensile'
            });


            let arrType = this.arrTags.map(x => x.type);
            if (arrType.includes('Ustensile')) {

                const divSpan = document.createElement('div');
                const tagSection = document.querySelector('.tag-section');

                divSpan.classList.add('tag-body-ustensil');
                divSpan.innerHTML = `
                                                      <span class="tag-span">${text}</span>
                                                      <img class="cross-tag" src="cross-circle.svg" alt="cross">
                                                  `
                tagSection.appendChild(divSpan);

            }

        }
    }

    refreshListIngredient() {

        let newIngredientList = this.filterTagMulti.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x);
        let setNewListIngredient = new Set(newIngredientList);
        const ulHtmlList = document.querySelector('.ul-container-list');
        ulHtmlList.innerHTML = "";
        setNewListIngredient.forEach((value) => {
            let liIngredient = document.createElement('li');
            liIngredient.classList.add('li-ingredient');
            liIngredient.innerHTML = value;
            // liIngredient.addEventListener('click', (e) => this.isItAnIngredient(e.target.textContent))
            ulHtmlList.appendChild(liIngredient);
        });
    }
    refreshListAppliance() {
        let newAppliance = this.filterTagMulti.map(item => item.appliance.toLowerCase());
        const ulHtmlListAppliance = document.querySelector('.ul-container-list-appliance');
        let setNewListAppliance = new Set(newAppliance);
        ulHtmlListAppliance.innerHTML = "";
        setNewListAppliance.forEach((value) => {
            let liAppliance = document.createElement('li');
            liAppliance.classList.add('li-appliance');
            liAppliance.innerHTML = value;
            ulHtmlListAppliance.appendChild(liAppliance);
        });

    }
    refreshListUstensil() {

        const ulHtmlListUstensils = document.querySelector('.ul-container-list-ustensils');
        let newUstensil = this.filterTagMulti.map(item => item.ustensils.map(item2 => item2.toLowerCase())).flatMap(x => x);

        let setNewListUstensil = new Set(newUstensil);
        ulHtmlListUstensils.innerHTML = "";
        setNewListUstensil.forEach((value) => {
            let liUstensil = document.createElement('li');
            liUstensil.classList.add('li-ustensil');
            liUstensil.innerHTML = value;
            ulHtmlListUstensils.appendChild(liUstensil);
        });
    }





    refreshIngredientListClicked() {
        // on filtre les ingédient restant par rapport au tableau multitag
        let newIngredientList = this.filterTagMulti.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x);
        let setNewListIngredient = new Set(newIngredientList);

        const ulHtmlList = document.querySelector('.ul-container-list');
        ulHtmlList.innerHTML = "";
        //             // je boucle le Set
        setNewListIngredient.forEach((value) => {
            let liIngredient = document.createElement('li');
            liIngredient.classList.add('li-ingredient');
            liIngredient.innerHTML = value;
            ulHtmlList.appendChild(liIngredient);
        });
    }
    refreshApplianceListClicked() {
        let newAppliance = this.filterTagMulti.map(item => item.appliance.toLowerCase());
        let setNewListAppliance = new Set(newAppliance);

        const ulHtmlListAppliance = document.querySelector('.ul-container-list-appliance');
        ulHtmlListAppliance.innerHTML = "";

        setNewListAppliance.forEach((value) => {
            let liAppliance = document.createElement('li');
            liAppliance.classList.add('li-appliance');
            liAppliance.innerHTML = value;
            ulHtmlListAppliance.appendChild(liAppliance);
        });

    }

    refreshUstensilListClicked() {
        let newUstensil = this.filterTagMulti.map(item => item.ustensils.map(item2 => item2.toLowerCase())).flatMap(x => x);
        let setNewListUstensil = new Set(newUstensil);

        const ulHtmlListUstensils = document.querySelector('.ul-container-list-ustensils');
        ulHtmlListUstensils.innerHTML = "";
        setNewListUstensil.forEach((value) => {
            let liUstensil = document.createElement('li');
            liUstensil.classList.add('li-ustensil');
            liUstensil.innerHTML = value;
            ulHtmlListUstensils.appendChild(liUstensil);
        });
    }


    isTextAlreadyExistInArrTag(itemThatWeClickOn) {
        //   vérification si l'élément sur lequel on va cliquer existe déja dans arrTag
        for (let i = 0; i < this.arrTags.length; i++) {
            if (this.arrTags[i].value === itemThatWeClickOn) {
                console.log('vous avez déja cliqué sur ce tag')
                this.clicked = true;

            }
        }
    }


    clickCross(e) {
        this.clicked = false;
        console.log('spanClicked ', e.target.parentElement);
        // le tag actuel 
        let spanClicked = e.target.parentElement;
        // supprimer le tag dans le dom 
        spanClicked.remove();
        // spanClicked.style.display = "none";
        console.log(spanClicked);
        // le mot à l'intérieur du span 
        let spanInside = spanClicked.querySelector('.tag-span').innerHTML;
        console.log(spanInside);
        console.log(this.arrTags);

        //    supprimer dans le tableau l'élément qu'on supprime en tag 
        this.arrTags = this.arrTags.filter((tag) => tag.value.toLowerCase() !== spanInside.toLowerCase())
        // clicked = false;
        console.log(this.arrTags);

        this.filterTagMulti = this.recipes.filter(el => {
            // je compare mon tableau avec mes tag selectionné à tous les tableau ustensils de chaque recette 
            return this.arrTags.map(item => item.value).every(i => el.appliance.toLowerCase().includes(i) || el.ustensils.includes(i) || el.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(i))
            // filterArrUstensils.push(el);
        });
        console.log(this.filterTagMulti);


        this.refreshIngredientListClicked();
        this.refreshApplianceListClicked();
        this.refreshUstensilListClicked();


        this.figureSection.innerHTML = "";

        this.createRecipesCard(this.filterTagMulti);
    }

    clickLiEvent(e) {

        // lorsqu'on clique sur un tag on doit pouvoir le faire qu'une seule fois 
        // c'est pour ça qu'on va creer une variable clicked et lui affecter false 
        let clicked = false;
        const text = e.target.innerHTML

        this.ingredients = this.recipes.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x)
        this.appliances = this.recipes.map(item => item.appliance.toLowerCase());
        this.ustensils = this.recipes.map(item => item.ustensils.map(item2 => item2.toLowerCase())).flatMap(x => x);

        console.log(this.arrTags);
        console.log(text);
        this.isTextAlreadyExistInArrTag(text);

        // si il existe pas alors on peut le creer  

        if (clicked === false) {
            // si ce sur quoi on a cliqué fait parti de la liste de nos ingrédients alors 
            // tu exécutes cette fonction ainsi de suite

            this.isItAnIngredient(text);

            this.isItAnAppliance(text);
            this.isItAnUstensil(text);
        }


        this.filterTagMulti = this.recipes.filter(el => {
            // je compare mon tableau avec mes tag selectionné à tous les tableaux ingrédient ustensils et appliance de chaque recette 
            // i c'est tous les élément de arrtag
            return this.arrTags.map(item => item.value).every(i => el.appliance.toLowerCase().includes(i) || el.ustensils.includes(i) || el.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(i))
        });

        // test 



        // FONCTION pour rafraîchir 


        this.refreshListIngredient();
        this.refreshListAppliance();
        this.refreshListUstensil();

        //             // je boucle le Set
        //             // a l'intérieur du ul je mets tous mes li 

        console.log(this.filterTagMulti);
        this.figureSection.innerHTML = "";
        this.createRecipesCard(this.filterTagMulti);


        // Supprimer un tag 
        this.crosses = document.querySelectorAll('.cross-tag');
        console.log(this.crosses);
        // this.clickCross(e)
        for (let i = 0; i < this.crosses.length; i++) {
            this.crosses[i].addEventListener('click', (e) => {
                this.clickCross(e)

            });
            // console.log(crosses[i]);
        }
    }

    createTag() {
        // const UlContain = document.querySelector('ul');
        const allLi = document.querySelectorAll('li');


        for (let x = 0; x < allLi.length; x++) {
            allLi[x].addEventListener('click', (e) => {
                this.clickLiEvent(e);
                console.log('Big TYMEEEEEEEE')
                // const crosses = document.querySelectorAll('.cross-tag');
                // console.log(crosses);


            });
        }
    }
}

const app = new App();
app.init();