const dropdown = document.querySelectorAll('.dropdown');
// selection tous les dropdowns

// pour chaque dropdowns

const select = document.querySelector('.select');
const newMenu = document.querySelector('.ul-container-list');
const caret = document.querySelector('#caret');

const selectAppliance = document.querySelector('.select-appliance');
const applianceMenu = document.querySelector('.ul-container-list-appliance');
const caretAppliance = document.querySelector('#caret-appliance');

const selectUstensils = document.querySelector('.select-ustensils');
const ustensilsMenu = document.querySelector('.ul-container-list-ustensils');
const caretUstensils = document.querySelector('#caret-ustensils');

select.addEventListener('click', () => {
    caret.classList.toggle('caret-rotate');
    newMenu.classList.toggle('menu-open');
    // applianceMenu.classList.add('menu-close');

});

selectAppliance.addEventListener('click', () => {
    caretAppliance.classList.toggle('caret-rotate');
    applianceMenu.classList.toggle('menu-open');
});

selectUstensils.addEventListener('click', () => {
    caretUstensils.classList.toggle('caret-rotate');
    ustensilsMenu.classList.toggle('menu-open');
});


// search input 
const searchInputIngredient = document.querySelector('#search-ingredient');
console.log(searchInputIngredient.value);
