const pokemonList = document.querySelector("#pokemonList");
const buttonsHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => showPokemon(data));
}

function showPokemon(poke) {
  let types = poke.types.map(
    (type) => `<p class="${type.type.name} type">${type.type.name}</p>`
  );
  types = types.join('');

  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
    <p class="pokemon-id-upper">#${pokeId}</p>
    <div class="pokemon-image">
      <img
        src="${poke.sprites.other["official-artwork"].front_default}"  alt="${
    poke.name
  }" />
    </div>
    <div class="pokemon-info">
      <div class="name-container">
        <p class="pokemon-id-middle">${pokeId}</p>
        <h2 class="pokemon-name">${poke.name}</h2>
      </div>
      <div class="pokemon-type">
        <p class="type">${types}</p>
      </div>
      <div class="pokemon-stats">
        <p class="stat">${poke.height / 10}m</p>
        <p class="stat">${poke.weight / 10}kg</p>
      </div>
    </div>
    
    `;
  pokemonList.append(div);
}

buttonsHeader.forEach((button) =>
  button.addEventListener("click", (event) => {
    const buttonId = event.currentTarget.id;

    pokemonList.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          if (buttonId === "see-all") {
            showPokemon(data);
          } else {
            const types = data.types.map((type) => type.type.name);
            if (types.some(type => type.includes(buttonId))) {
              showPokemon(data);
            }
          }

        })
    }
  }))
