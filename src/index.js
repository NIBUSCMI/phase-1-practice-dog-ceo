console.log('%c HI', 'color: firebrick')

//image URL
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
  loadImages();
  loadBreedOptions();
});

function loadImages() {
  fetch(imgUrl)
    .then(resp=> resp.json())
    .then(results => {
      results.message.forEach(image => addImage(image))
    });
}

function addImage(Url) {
  let container = document.querySelector('#dog-image-container');
  let newImageElement = document.createElement('img');
  newImageElement.src = Url;
  container.appendChild(newImageElement );
}

function loadBreedOptions() {
    fetch(breedUrl)
    .then(respon => respon.json())
    .then(results => {
        breeds = Object.keys(results.message);
        console.log(breeds);
        makeBreedList(breeds);
        letterSelector();
    });
}

function makeBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    for (let breed of breeds) {
        let li = document.createElement('li');
        li.style.cursor = 'pointer';
        li.textContent = breed;
        ul.appendChild(li);
        li.addEventListener('click', changeColor);
    }
}

function letterSelector () {
    let breedDrop = document.getElementById("breed-dropdown");
    breedDrop.addEventListener('change' , (event) => {
        breedFilter(event.target.value);

    })
}

function breedFilter (letter) {
    let filteredArr = breeds.filter(breed => breed.startsWith(letter));
    let ul = document.querySelector('#dog-breeds');
    removeFirstList(ul);
    makeBreedList(filteredArr);
}

function removeFirstList (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function changeColor (event) {
    event.target.style.color = 'green';
}









