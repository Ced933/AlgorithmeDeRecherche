class App {
    constructor() {

        this.recetteApi = new Api('data/recette.json');
        this.sectionRecipe = document.querySelector('#figure-section');
        this.sectionInredients = document.querySelector('.container-ul');
        // La où va être stocké les tag 
        this.arrTags = [];
        this.ingredients = [];
        this.appliances = [];
        this.ustensils = [];
        this.arrTags = [];
    }


    async init() {
        this.figureSection = document.querySelector('#figure-section');
        const dataRecipes = await this.recetteApi.getApi();
        this.recipes = dataRecipes.recipes;
        this.createRecipesCard(this.recipes);
        this.listOfIngredients();
        this.noResult();
        this.isTextAlreadyExistInArrTag(this.itemThatWeClickOn);
        const ingredientInputSearch = document.querySelector('#search-ingredient');
        this.crosses = document.querySelectorAll('.cross-tag');
        ingredientInputSearch.addEventListener('input', this.filterIngredient);
        this.listOfAppliances();
        const searchInputAppliance = document.querySelector('#search-appliance');
        searchInputAppliance.addEventListener("input", this.filterAppliance);
        const searchInputUstensil = document.querySelector('#search-ustensils');
        searchInputUstensil.addEventListener("input", this.filterUstensil);
        this.clicked = false;
        this.listOfUstenciles();
        const mainInputSearch = document.querySelector('#search-main');
        mainInputSearch.addEventListener('input', (e) => this.filterData(e));
        // permet de cliquer sur les autres tags apres avoir cliqué sur un premier tag 
        const UlContain = document.querySelectorAll('ul');
        UlContain.forEach(ul => {
            ul.addEventListener('click', (e) => {
                this.createTag();
            });
        });
        this.createTag();

    }
    // CREATION DE LA FIGURE CARTE 
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
                <p class="p-ingredients">${recipe.ingredients.map(el => (el.ingredient === undefined ? "" : el.ingredient) + " : " + (el.quantity === undefined ? "" : el.quantity) + (el.unit === undefined ? "" : el.unit) + "<br>")} </p>

                    <p class="p-describe">${recipe.description}</p>
                </div>
            </figcaption>`;
            //Dans certains array il y a des undefined alors pour eviter qu'ils s'affichent on va les supprimer en les remplaçant par des espaces exemple: (el.ingredient === undefined ? "" : el.ingredient)
            const figureSection = document.querySelector('#figure-section');
            figureSection.appendChild(recipeFigure);
        });
    }

    // LISTE DES INGREDIENTS + RECHERCHE DES INGRÉDIENTS DANS L'INPUT 

    listOfIngredients() {
        // Je boucle tous les ingrédients avec leur doublons  
        const ingredients = this.recipes.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x);

        // Je mets la variable ingrédients dans set pour avoir chaque valeur une seule fois 
        let setIngredient = new Set(ingredients);

        const ulHtmlList = document.querySelector('.ul-container-list');
        // je boucle le Set
        setIngredient.forEach((value) => {
            // je cree un li 
            let liIngredient = document.createElement('li');
            // dans le quel je vais glisser la value qui est un ingrédient unique 
            liIngredient.innerHTML = value;
            // je lui ajoute une class 
            liIngredient.classList.add('li-ingredient');
            // A l'intérieur du ul ingrédient je mets tous mes li 
            ulHtmlList.appendChild(liIngredient);
        });

    }

    filterIngredient() {
        const ingredientInputSearch = document.querySelector('#search-ingredient');
        // La valeur qu'est en train d'entrer l'utilisateur dans l'input de recherche 
        const filterIngr = ingredientInputSearch.value.toLowerCase();
        const allIngredientItem = document.querySelectorAll('.li-ingredient');
        // pour chaque item (li) on gardera uniquement ceux qui correspondent à ce que tape l'utilisateur, les autres seront supprimés
        allIngredientItem.forEach((item) => {
            let text = item.innerHTML;

            if (text.toLowerCase().includes(filterIngr.toLowerCase())) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });

    }

    // LISTE DES APPAREILS + RECHERCHE DES APPAREILS DANS L'INPUT 
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
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });

    }

    // LISTE DES USTENSILES + RECHERCHE DES USTENSILES DANS L'INPUT 
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
            if (text.toLowerCase().includes(filterUst.toLowerCase())) {
                item.style.display = '';
            } else {
                item.style.display = 'none';

            }
        });

    }

    // RECHERCHE DANS LA BARRE PRINCIPALE 

    noResult() {
        // En cas de non recherche trouvé 
        let mainInputSearch = document.querySelector('#search-main');
        const h2NoResult = document.createElement('h2');
        h2NoResult.innerHTML = "Aucun resultat trouvé pour " + mainInputSearch.value + "!";
        this.figureSection.appendChild(h2NoResult);
    }

    // À chaque fois que l'utilisateur tape une lettre dans la barre de recherche cette fonction est appelée 
    filterData(e) {
        this.figureSection = document.querySelector('#figure-section');
        let mainInputSearch = document.querySelector('#search-main');
        // Au bout de trois caractères la recherche se lance
        if (mainInputSearch.value.length >= 3) {
            this.figureSection.innerHTML = "";
            // Ce que l'utilisateur est en train de chercher dans l'input
            const searchString = e.target.value.toLowerCase();
            // Création d'un tableau avec ma recherche actuelle 

            //   initialiser un tableau vide 
            let filterForArrNameDescriptionIngredient = [];


            for (let i = 0; i < this.recipes.length; i++) {
                let nameRecipes = this.recipes[i];

                if (nameRecipes.name.toLowerCase().includes(searchString) || nameRecipes.description.toLowerCase().includes(searchString) || nameRecipes.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(searchString)) {
                    //   On va garder uniquement les recettes qui remplissent nos conditions et les pusher dans nôtre tableau vide 
                    filterForArrNameDescriptionIngredient.push(nameRecipes);
                }

            }
            // Grâce à notre tableau on va pouvoir créer les cartes 
            this.createRecipesCard(filterForArrNameDescriptionIngredient);

        }

        // Lorsqu'on trouve rien  message d'erreur apparaît 
        if (this.figureSection.innerHTML == "") {
            this.noResult();
        }

        // lorsque il n'y a plus rien dans l'input recherche on le réinitialise avec toutes les recettes du début
        if (mainInputSearch.value.length === 0) {
            this.figureSection.innerHTML = "";
            this.createRecipesCard(this.recipes);
        }
    }

    isItAnIngredient(text) {
        // Si le li sur le quelle on a cliqué se trouve dans ingrédients alors on le push dans arrTag avec le tag de la bonne couleur  
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
                        <img class="cross-tag" src="assets/cross-circle.svg" alt="cross">
                    `;
                tagSection.appendChild(divSpan);
            }
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
                        <img class="cross-tag" src="assets/cross-circle.svg" alt="cross">
                    `;
                tagSection.appendChild(divSpan);
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
                        <img class="cross-tag" src="assets/cross-circle.svg" alt="cross">
                    `;
                tagSection.appendChild(divSpan);
            }
        }
    }

    // Cette fonction nous sert à actualiser les listes après avoir cliqué sur un li 
    refreshListIngredient() {
        let newIngredientList = this.filterTagMulti.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x);
        let setNewListIngredient = new Set(newIngredientList);
        const ulHtmlList = document.querySelector('.ul-container-list');
        ulHtmlList.innerHTML = "";
        setNewListIngredient.forEach((value) => {
            let liIngredient = document.createElement('li');
            liIngredient.classList.add('li-ingredient');
            liIngredient.innerHTML = value;
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

    // -------------------------------
    // Ces fonctions va être acvité lorsqu'on va supprimer un tag 
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

    // Éviter que l'utilisateur ne clique deux fois sur le même tag
    isTextAlreadyExistInArrTag(itemThatWeClickOn) {
        //   vérification si l'élément sur lequel on va cliquer existe déja dans arrTag
        for (let i = 0; i < this.arrTags.length; i++) {
            if (this.arrTags[i].value === itemThatWeClickOn) {
                console.log('vous avez déja cliqué sur ce tag');
                // on donne true car il existe déjà dans notre tableau
                this.clicked = true;
            }
        }
    }

    // la fonction qui va être appelé lorsqu'on va cliquer sur la croix d'un tag 
    clickCross(e) {
        // notre tag est égale à true alors vu qu'on le supprimer on lui redonne sa valeur initiale, false 
        this.clicked = false;
        // le tag actuel 
        let spanClicked = e.target.parentElement;
        // supprimer le tag dans le dom 
        spanClicked.remove();
        // // le mot à l'intérieur du span 
        let spanInside = spanClicked.querySelector('.tag-span').innerHTML;
        // Supprimer dans le tableau l'élément qu'on supprime en tag 
        this.arrTags = this.arrTags.filter((tag) => tag.value.toLowerCase() !== spanInside.toLowerCase());

        // On réactualise les élements de notre this.filterTagMulti sans l'élément qu'on vient de supprimer 
        this.filterTagMulti = this.recipes.filter(el => {
            return this.arrTags.map(item => item.value).every(i => el.appliance.toLowerCase().includes(i) || el.ustensils.includes(i) || el.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(i));
        });

        // Chaque liste est actualisé 
        this.refreshIngredientListClicked();
        this.refreshApplianceListClicked();
        this.refreshUstensilListClicked();


        this.figureSection.innerHTML = "";

        this.createRecipesCard(this.filterTagMulti);


        this.createTag();
    }

    // Cette fonction va être déclanché à chaque clique sur un li 
    clickLiEvent(e) {
        // On initialise clicked à false si on le fait pas les élements peuvent être affecté par true 
        this.clicked = false;
        const text = e.target.innerHTML;

        this.ingredients = this.recipes.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x);
        this.appliances = this.recipes.map(item => item.appliance.toLowerCase());
        this.ustensils = this.recipes.map(item => item.ustensils.map(item2 => item2.toLowerCase())).flatMap(x => x);

        // on vérifie si le tag n'a pas déjà été cliqué si oui on lui affect true et il ne retrera pas dans notre condition
        this.isTextAlreadyExistInArrTag(text);



        // Lorsqu'on clique sur un tag on doit pouvoir le faire qu'une seule fois 
        // si c'est la 1er fois qu'on clique sur notre li alors il rentre dans notre condition 
        if (this.clicked === false) {

            this.isItAnIngredient(text);
            this.isItAnAppliance(text);
            this.isItAnUstensil(text);

        }


        this.filterTagMulti = this.recipes.filter(el => {
            // je compare mon tableau avec mes tag selectionné à tous les tableaux ingrédient ustensils et appliance de chaque recette 
            // i c'est tous les éléments de arrtag
            return this.arrTags.map(item => item.value).every(i => el.appliance.toLowerCase().includes(i) || el.ustensils.includes(i) || el.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(i));
        });

        // FONCTION pour rafraîchir les listes

        this.refreshListIngredient();
        this.refreshListAppliance();
        this.refreshListUstensil();

        this.figureSection.innerHTML = "";
        this.createRecipesCard(this.filterTagMulti);


        this.crosses = document.querySelectorAll('.cross-tag');
        for (let i = 0; i < this.crosses.length; i++) {
            this.crosses[i].addEventListener('click', (e) => {
                this.clickCross(e);
            });
        }
    }

    createTag() {

        const allLi = document.querySelectorAll('li');

        for (let x = 0; x < allLi.length; x++) {
            allLi[x].addEventListener('click', (e) => {
                this.clickLiEvent(e);
            });
        }
    }
}

const app = new App();
app.init();
