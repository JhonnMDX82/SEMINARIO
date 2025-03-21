// src/pokemon.ts

export interface PokemonSprites {
    [key: string]: string | null;
  }
  
  export interface PokemonAbility {
    ability: {
      name: string;
    };
  }
  
  export interface PokemonType {
    type: {
      name: string;
    };
  }
  
  export interface PokemonResponse {
    id: number;
    name: string;
    sprites: PokemonSprites;
    abilities: PokemonAbility[];  // Habilidades del Pokémon
    types: PokemonType[];        // Tipos del Pokémon
    weight: number;               // Peso del Pokémon
  }
  
  import { fetchFromApi } from './api';
  
  export function fetchPokemon(nameOrId: string): Promise<PokemonResponse> {
    return fetchFromApi<PokemonResponse>('pokemon', nameOrId);
  }
  

  