document.addEventListener("DOMContentLoaded", () => {
  const pokemonList = document.querySelector("#pokemonList");
  const buttonsHeader = document.querySelectorAll(".btn-header");
  const URL = "https://pokeapi.co/api/v2/pokemon/";

  // Fetch and display the initial set of Pokemon
  fetchPokemon();

  // Add event listeners to the header buttons
  buttonsHeader.forEach((button) =>
    button.addEventListener("click", async (event) => {
      const buttonId = event.currentTarget.id;

      pokemonList.innerHTML = "";

      await fetchPokemon(buttonId);
    })
  );

  async function fetchPokemon(filterType) {
    for (let i = 1; i <= 151; i++) {
      try {
        const response = await fetch(URL + i);
        const data = await response.json();

        if (!filterType || filterType === "see-all") {
          showPokemon(data);
        } else {
          const types = data.types.map((type) => type.type.name);
          if (types.includes(filterType)) {
            showPokemon(data);
          }
        }
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    }
  }

  function showPokemon(poke) {
    let types = poke.types
      .map((type) => `<p class="${type.type.name} type">${type.type.name}</p>`)
      .join('');

    let pokeId = poke.id.toString().padStart(3, '0');

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
      <p class="pokemon-id-upper">#${pokeId}</p>
      <div class="pokemon-image">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}" />
      </div>
      <div class="pokemon-info">
        <div class="name-container">
          <p class="pokemon-id-middle">${pokeId}</p>
          <h2 class="pokemon-name">${poke.name}</h2>
        </div>
        <div class="pokemon-type">
          ${types}
        </div>
        <div class="pokemon-stats">
          <p class="stat">${poke.height / 10}m</p>
          <p class="stat">${poke.weight / 10}kg</p>
        </div>
      </div>
    `;
    pokemonList.append(div);
  }
});