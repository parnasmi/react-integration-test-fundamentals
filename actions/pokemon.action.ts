"use server";

/**
 * PokeAPI Types
 */

interface PokeAPIListResponse {
  results: {
    name: string;
    url: string;
  }[];
}

interface PokeAPITypeResponse {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}

interface PokeAPIDetailResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

/**
 * Application Model Types
 */

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: PokemonStats;
}

const STAT_NAME_MAP: Record<string, keyof PokemonStats> = {
  hp: "hp",
  attack: "attack",
  defense: "defense",
  "special-attack": "spAtk",
  "special-defense": "spDef",
  speed: "speed",
};

/**
 * Helper to map PokeAPI detail to our Pokemon model.
 */
function mapPokeDetailToPokemon(detail: PokeAPIDetailResponse): Pokemon {
  return {
    id: detail.id,
    name: detail.name,
    image: detail.sprites.front_default,
    types: detail.types.map((t) => t.type.name),
    stats: detail.stats.reduce((acc, s) => {
      const mappedName = STAT_NAME_MAP[s.stat.name];
      if (mappedName) {
        acc[mappedName] = s.base_stat;
      }
      return acc;
    }, {} as PokemonStats),
  };
}

/**
 * Server action to fetch and transform Pokemon data.
 */
export async function getPokemons(): Promise<Pokemon[]> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }

  const listData: PokeAPIListResponse = await response.json();

  const pokemonDetails = await Promise.all(
    listData.results.map(async (p) => {
      const res = await fetch(p.url);
      if (!res.ok) {
        throw new Error(`Failed to fetch details for ${p.name}`);
      }
      return res.json() as Promise<PokeAPIDetailResponse>;
    }),
  );

  return pokemonDetails.map(mapPokeDetailToPokemon);
}

/**
 * Server action to fetch Pokemon by type.
 */
export async function getPokemonsByType(type: string): Promise<Pokemon[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon of type ${type}`);
  }

  const typeData: PokeAPITypeResponse = await response.json();

  const pokemonDetails = await Promise.all(
    typeData.pokemon.slice(0, 20).map(async (p) => {
      const res = await fetch(p.pokemon.url);
      if (!res.ok) {
        throw new Error(`Failed to fetch details for ${p.pokemon.name}`);
      }
      return res.json() as Promise<PokeAPIDetailResponse>;
    }),
  );

  return pokemonDetails.map(mapPokeDetailToPokemon);
}
