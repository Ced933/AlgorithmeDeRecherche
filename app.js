


class App {
    constructor() {
        this.recetteApi = new Api('data/recette.json');
        this.sectionRecipe = document.querySelector('.figure-section');
        this.sectionInredients = document.querySelector('.container-ul');

    }

    selectedFilter = [];
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















        function createTag() {
            //     // lorsqu'on clique sur un tage on doit pouvoir le faire qu'une seule fois 
            //     // c'est pour ça qu'on va creer une variable clicked et lui affecter false 
            const tagSection = document.querySelector('.tag-section');
            const allItemIngredient = document.querySelectorAll('li');

            let arrTags = [];
            allItemIngredient.forEach(li => {
                // console.log(li);
                let clicked = false;
                li.addEventListener('click', e => {
                    if (clicked == false) {
                        //                 // je recupère la valeur du li sur le quel je viens de cliquer 
                        const text = e.target.innerHTML
                        const ingredients = recipes.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x)
                        const appliances = recipes.map(item => item.appliance.toLowerCase());
                        const ustensils = recipes.map(item => item.ustensils.map(item2 => item2.toLowerCase())).flatMap(x => x);
                        // let increase = 0;

                        //                 function creationTag() {
                        //        
                        if (ingredients.includes(text)) {

                            arrTags.push({
                                // id: `${++increase}`,
                                value: text,
                                type: 'Ingrédient'
                            })
                        }
                        else if (appliances.includes(text)) {


                            arrTags.push({
                                value: text,
                                type: 'Appareil'
                            })
                        }
                        else if (ustensils.includes(text)) {

                            arrTags.push({
                                value: text,
                                type: 'Ustensile'
                            })
                        }

                        console.log(arrTags);



                        let arrType = arrTags.map(x => x.type);
                        console.log(arrType);



                        const divSpan = document.createElement('div');
                        if (arrType.includes('Ingrédient')) {
                            divSpan.classList.add('tag-body-ingredient');
                            // divSpan.setAttribute(id,)
                            divSpan.innerHTML = `
                            <span class="tag-span">${text}</span>
                            <img class="cross-tag" src="cross-circle.svg" alt="cross">
                        `
                            tagSection.appendChild(divSpan);
                        }

                        else if (arrType.includes('Appareil')) {
                            // const divSpanAppliance = document.createElement('div');
                            divSpan.classList.add('tag-body-appliance');
                            divSpan.innerHTML = `
                                <span class="tag-span">${text}</span>
                                <img class="cross-tag" src="cross-circle.svg" alt="cross">
                            `
                            tagSection.appendChild(divSpan);
                        }

                        else if (arrType.includes('Ustensile')) {
                            // const divSpanUstensil = document.createElement('div');
                            divSpan.classList.add('tag-body-ustensil');
                            divSpan.innerHTML = `
                            <span class="tag-span">${text}</span>
                            <img class="cross-tag" src="cross-circle.svg" alt="cross">
                        `
                            tagSection.appendChild(divSpan);
                        }





                        // crosses.forEach(cross => {

                        //     cross.addEventListener('click', (e, index) => {
                        //         // lorsque je clique sur la croix elle efface mon tag et reinitialise 

                        //         // target l'lement parent de notre croix pour qu'on puisse faire disparaitre  uniquement l'element sur lequel on clique 
                        //         let spanClicked = e.target.parentElement;

                        //         let spanInside = spanClicked.querySelector('.tag-span').innerHTML;
                        //         // if(spanInside === )
                        //         // arrTags.pop();
                        //         console.log(arrTags.includes('carotte'));

                        //         console.log(spanInside);
                        //         // console.log(spanClicked);
                        //         // spanClicked.style.display = 'none';
                        //         alert();
                        //         // arrTags.splice(1, 0);

                        //         // arrTags.splice(index, 1);

                        //         // console.log(arrTags);
                        //         // figureSection.innerHTML = "";
                        //         // la variable a false  on va donc pouvoir recliquer dessus
                        //         clicked = false;
                        //         // createRecipesCard(recipes);

                        //     })
                        // })






                        // console.log(tabTag);

                        //                     divSpanIngredient.classList.add('tag-body-ingredient');
                        // divSpanIngredient.innerHTML = `
                        //     <span class="tag-span">${text}</span>
                        //     <img class="cross-tag" src="cross-circle.svg" alt="cross">
                        // `
                        // tagSection.appendChild(divSpanIngredient);
                        //                     // si on a passé cette étape c'est que c'est la premieere fois quon clique sur le li 
                        //                     // notre clicked vaut true maintenant 

                        //                     const crosses = document.querySelectorAll('.cross-tag');

                        //                     crosses.forEach(cross => {

                        //                         cross.addEventListener('click', () => {
                        //                             // lorsque je clique sur la croix elle efface mon tag et reinitialise 
                        //                             // la variable a false  on va donc pouvoir recliquer dessus
                        //                             divSpanIngredient.style.display = 'none';

                        //                             figureSection.innerHTML = "";
                        //                             clicked = false;
                        //                             // createRecipesCard(recipes);

                        //                         })
                        //                     })


                        // }
                        //                 creationTag();
                        clicked = true;
                        // searchWithTag();
                        //                 // getSpanValue();

                    }
                    else {
                        console.log('vous avez déja cliquer sur ce bouton');
                    }
                    const crosses = document.querySelectorAll('.cross-tag');

                    let i;
                    for (i = 0; i < crosses.length; i++) {
                        crosses[i].onclick = function (e) {
                            // alert();
                            let spanClicked = e.target.parentElement;
                            spanClicked.remove();
                            console.log(spanClicked);
                            let spanInside = spanClicked.querySelector('.tag-span').innerHTML;
                            console.log(spanInside);
                            arrTags.splice(spanInside, 1);
                            clicked = false;
                            console.log(arrTags);
                        }
                    }
                })
            })
        }
        createTag();
        // return setIngredient;
        // function searchWithTag() {
        //     let tabTag = [];
        //     const ingredients = recipes.map(item => item.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())).flatMap(x => x)
        //     const appliances = recipes.map(item => item.appliance.toLowerCase());
        //     const ustensils = recipes.map(item => item.ustensils.map(item2 => item2.toLowerCase())).flatMap(x => x);
        //     // récupère les tags
        //     let setUstensils = new Set(ustensils);
        //     let listOfTag = document.querySelectorAll('.tag-span');
        //     // ou seront stocké les tag 
        //     // extrait intérieur du tag 

        //     let allNameOfTag = listOfTag.forEach(el => {
        //         console.log(el);
        //         let allSpan = document.querySelectorAll('span');
        //         if (ingredients.includes(el.innerHTML)) {

        //             // allSpan.forEach(x => {
        //             //     x.classList.add('tag-body-ingredient');
        //             // })

        //             tabTag.push({
        //                 value: el.innerHTML,
        //                 type: 'Ingrédient'
        //             })
        //         }
        //         if (appliances.includes(el.innerHTML)) {
        //             // allSpan.forEach(x => {
        //             //     x.classList.add('tag-body-appliance');
        //             // })

        //             tabTag.push({
        //                 value: el.innerHTML,
        //                 type: 'Appareil'
        //             })
        //         }
        //         if (ustensils.includes(el.innerHTML)) {

        //             tabTag.push({
        //                 value: el.innerHTML,
        //                 type: 'Ustensile'
        //             })
        //         }
        //         // if (setUstensils.forEach(ust => ust.includes('saladier'))) {

        //         //     tabTag.push({
        //         //         value: el.innerHTML,
        //         //         type: 'Ustensile'
        //         //     })
        //         // }
        //     });

        //     let arrType = tabTag.map(x => x.type);
        //     if (arrType.includes('Ingrédient')) {
        //         console.log("C'est bien un ingredient")
        //     }

        //     if (arrType.includes('Appareil')) {
        //         console.log("c'est bien un Appareil")
        //     }

        //     if (arrType.includes('Ustensile')) {
        //         console.log("c'est bien un ustensile")
        //     }


        //     console.log(tabTag);
        //     // if (tabTag.map(x => x.type) === "Ingrédient") {
        //     //     console.log("c'est bien un ingrédient")
        //     // }

        //     const crosses = document.querySelectorAll('.cross-tag');

        //     crosses.forEach(cross => {

        //         cross.addEventListener('click', e => {
        //             // lorsque je clique sur la croix elle efface mon tag et reinitialise 
        //             // la variable a false  on va donc pouvoir recliquer dessus

        //             tabTag.pop();


        //             console.log(tabTag);
        //             let filterTagMultipleIngredient = recipes.filter(el => {
        //                 // je compare mon tableau avec mes tag selectionné à tous les tableau ustensils de chaque recette 
        //                 return tabTag.every(i => el.ustensils.includes(i))
        //                 // filterArrUstensils.push(el);

        //             });
        //             createRecipesCard(filterTagMultipleIngredient);
        //             console.log(filterTagMultipleIngredient);


        //         })
        //     });

        //     figureSection.innerHTML = "";

        //     // const filterArrUstensils = [];

        //     let filterTagMultiple = recipes.filter(el => {
        //         // je compare mon tableau avec mes tag selectionné à tous les tableau ustensils de chaque recette 
        //         return tabTag.every(i => el.ingredients.map(ingredient => ingredient).includes(i))
        //         // filterArrUstensils.push(el);

        //     });
        //     console.log(filterTagMultiple);

        //     createRecipesCard(filterTagMultiple);
        // }
        // searchWithTag();



    }





}

const app = new App();
app.AllRecepie();