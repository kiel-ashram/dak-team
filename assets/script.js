var pokeLat = document.getElementById("poke-lat");
var pokeLong = document.getElementById("poke-long");
var newLocale = { lat: null, lng: null };

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
  let attack = pokeData.stats[1].base_stat;
  let defense = pokeData.stats[2].base_stat;
  //format ID to show 3 places always
  id = ("000" + id).slice(-3);
  pokeTitle.textContent = id + ": " + pokeData.name;
  pokeDiv.appendChild(pokeImg);
  pokeDiv.appendChild(pokeTitle);
  pokeLi.appendChild(pokeDiv);

  pokeLi.dexId = id;

  pokeLi.attack = attack;
  pokeLi.defense = defense;
  return pokeLi;
};

// call for all 845 pokemon
pokeHandler(845);

let map;

function initMap() {
  var location = { lat: 0, lng: 0 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 8,
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  console.log(map);
}

// create onClick which passes lat and long data
pokeLat.addEventListener("click", function (event) {
  var id = event.target.closest("li").dexId;
  console.log(id);
  id = parseFloat(id);
  var attack = event.target.closest("li").attack;
  if (attack > 90) {
    attack = attack * 0.1;
  }
  if (id % 2) {
    console.log(id % 2);
    attack = -1 * attack;
  }
  console.log(attack);
  newLocale.lat = attack;
});

pokeLong.addEventListener("click", function (event) {
  var id = event.target.closest("li").dexId;
  id = parseFloat(id);
  var defense = event.target.closest("li").defense;
  if (defense > 180) {
    defense = defense * 0.1;
  }
  if (id % 2) {
    defense = defense * -1;
  }
  console.log(defense);
  newLocale.lng = defense;
});
