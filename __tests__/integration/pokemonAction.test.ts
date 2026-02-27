import { describe, test, expect } from "vitest";
import { getPokemons, getPokemonsByType } from "../../actions/pokemon.action";

describe("Pokemon Server Actions", () => {
  test("should fetch pokemon list", async () => {
    const pokemon = await getPokemons();
    expect(pokemon).toHaveLength(2);

    expect(pokemon[0]).toEqual({
      id: 1,
      name: "bulbasaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      types: ["grass", "poison"],
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        spAtk: 65,
        spDef: 65,
        speed: 45,
      },
    });
  });

  test("should fetch pokemon by type", async () => {
    const pokemon = await getPokemonsByType("grass");
    expect(pokemon).toHaveLength(2);
    expect(pokemon[0]).toEqual({
      id: 1,
      name: "bulbasaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      types: ["grass", "poison"],
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        spAtk: 65,
        spDef: 65,
        speed: 45,
      },
    });

    expect(pokemon[1]).toEqual({
      id: 2,
      name: "ivysaur",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      types: ["grass", "poison"],
      stats: {
        hp: 60,
        attack: 62,
        defense: 63,
        spAtk: 80,
        spDef: 80,
        speed: 60,
      },
    });
  });
});
