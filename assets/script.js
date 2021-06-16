var pokeLat = document.getElementById("poke-lat");
var pokeLong = document.getElementById("poke-long");

async function pokeHandler(num) {
  // for 1-number passed
  for (i = 1; i < num + 1; i++) {
    // create URL
    let url = "https://pokeapi.co/api/v2/pokemon/" + i + "/";
    // request pokemod data
    let response = await fetch(url);
    // deal with promise
    let pokeData = await response.json();

    // add div to lists
    // TODO: only last list getting child. Why?
    pokeLong.appendChild(createListElement(pokeData));
    pokeLat.appendChild(createListElement(pokeData));
  }
}

var createListElement = function (pokeData) {
  // create a list item with a div including sprite and pokemon ID + name
  let pokeLi = document.createElement("li");
  //create div
  let pokeDiv = document.createElement("div");
  //create img + set URL for img
  let pokeImg = document.createElement("img");
  pokeImg.src = pokeData.sprites.front_default;
  //create pokemon label
  let pokeTitle = document.createElement("h3");
  let id = pokeData.id;
  //format ID to show 3 places always
  id = ("000" + id).slice(-3);
  pokeTitle.textContent = id + ": " + pokeData.name;
  pokeDiv.appendChild(pokeImg);
  pokeDiv.appendChild(pokeTitle);
  pokeLi.appendChild(pokeDiv);
  pokeDiv.dexId = id;
  pokeImg.dexId = id;
  pokeLi.dexId = id;

  return pokeLi;
};

// call for all 845 pokemon
pokeHandler(845);

// create onClick which passes lat and long data
pokeLat.addEventListener("click", function (event) {
  console.log(event.target.dexId);
});

pokeLong.addEventListener("click", function (event) {
  console.log(event.target.dexId);
});

var latLong = function () {
  //define what parameters to pass
  return true; //prevents errors while function not defined
};
