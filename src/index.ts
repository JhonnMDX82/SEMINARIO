// src/index.ts

import { fetchPokemon } from './pokemon';
import { renderPokemon } from './ui';

const input = document.getElementById('searchInput') as HTMLInputElement;
const button = document.getElementById('searchBtn') as HTMLButtonElement;
const resultDiv = document.getElementById('result')!;
let currentId: number | null = null; // Variable para almacenar el ID del Pokémon actual

// Función para manejar la búsqueda por ID
const searchPokemonById = async (id: number) => {
  resultDiv.innerHTML = "🔄 Buscando...";

  try {
    const pokemon = await fetchPokemon(id.toString());
    renderPokemon(pokemon);
    currentId = pokemon.id; // Actualizar el ID actual
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${(error as Error).message}</p>`;
  }
};
// src/index.ts

const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;

// Manejar los clics en los botones de navegación
prevBtn.addEventListener('click', () => {
  if (currentId !== null && currentId > 1) {
    searchPokemonById(currentId - 1); // Buscar Pokémon con ID - 1
  }
});

nextBtn.addEventListener('click', () => {
  if (currentId !== null) {
    searchPokemonById(currentId + 1); // Buscar Pokémon con ID + 1
  }
});


// Evento de búsqueda por nombre o ID
button.addEventListener('click', async () => {
  const name = input.value.trim();
  if (!name) return;

  resultDiv.innerHTML = "🔄 Buscando...";

  try {
    const pokemon = await fetchPokemon(name);
    renderPokemon(pokemon);
    currentId = pokemon.id; // Actualizar el ID actual
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${(error as Error).message}</p>`;
  }
});

// Eventos de navegación con las flechas
document.addEventListener('keydown', async (event) => {
  if (event.key === 'ArrowLeft' && currentId !== null && currentId > 1) {
    // Flecha izquierda: buscar Pokémon con ID - 1
    searchPokemonById(currentId - 1);
  } else if (event.key === 'ArrowRight' && currentId !== null) {
    // Flecha derecha: buscar Pokémon con ID + 1
    searchPokemonById(currentId + 1);
  }
});

// Opcional: Añadir funcionalidad para que la búsqueda funcione con las flechas
input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter' && input.value.trim()) {
    const nameOrId = input.value.trim();
    searchPokemonById(Number(nameOrId) || 1); // Buscar por ID o por nombre
  }
});

