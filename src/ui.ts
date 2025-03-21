// src/ui.ts

import { PokemonResponse } from './pokemon';

export function renderPokemon(pokemon: PokemonResponse): void {
  const resultDiv = document.getElementById('result')!;
  
  // Convertir el peso de hectogramos a kilogramos (PokéAPI devuelve en hectogramos)
  const weightInKg = pokemon.weight / 10;

  // Renderizar los resultados, incluyendo habilidades, tipos y peso
  resultDiv.innerHTML = `
    <h2>${pokemon.name.toUpperCase()}</h2>
    <p><strong>ID:</strong> ${pokemon.id}</p>
    <p><strong>Peso:</strong> ${weightInKg} kg</p>
    
    <p><strong>Tipos:</strong> 
      ${pokemon.types.map(type => type.type.name).join(', ')}
    </p>

    <p><strong>Habilidades:</strong> 
      ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}
    </p>

    <div>
      ${Object.entries(pokemon.sprites)
        .filter(([_, value]) => typeof value === "string" && value !== null)
        .map(([key, value]) => `<img src="${value}" alt="${key}" title="${key}" />`)
        .join('')}
    </div>
  `;
}
