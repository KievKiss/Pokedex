const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    } else {
        return null;
    }
};


const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '???';

    const data = await fetchPokemon(pokemon);

    if (data && data.id < 650) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;

        if (data.name.length > 16) {
            pokemonName.classList.add('long2');
            pokemonName.classList.remove('long');

        } else if (data.name.length > 13) {
            pokemonName.classList.add('long');
            pokemonName.classList.remove('long2');

        } else {
            pokemonName.classList.remove('long');
            pokemonName.classList.remove('long2'); 
        }

        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        searchPokemon = data.id;
        input.value = '';
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '???';
    }
};


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});


buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});


buttonNext.addEventListener('click', () => {
    if (searchPokemon < 649) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});


document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        if (searchPokemon > 1) {
            searchPokemon -= 1;
            renderPokemon(searchPokemon);
        }
    } else if (event.key === 'ArrowRight') {
        if (searchPokemon < 649) {
            searchPokemon += 1;
            renderPokemon(searchPokemon);
        }
    }
});

renderPokemon(searchPokemon);
