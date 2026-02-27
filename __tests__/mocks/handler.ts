import { http, HttpResponse } from "msw";
import {
  mockPokemonList,
  mockPokemonMap,
  mockTypeGrassResponse,
} from "./mock.data";

const BASE_URL = "https://pokeapi.co/api/v2";

export const handlers = [
  // List pokemons
  http.get(`${BASE_URL}/pokemon`, () => {
    return HttpResponse.json(mockPokemonList);
  }),

  // Pokemon details
  http.get(`${BASE_URL}/pokemon/:idOrName`, ({ params }) => {
    const { idOrName } = params;
    const pokemon = mockPokemonMap[idOrName as string];

    if (!pokemon) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(pokemon);
  }),
  http.get(`${BASE_URL}/type/:type`, () => {
    return HttpResponse.json(mockTypeGrassResponse);
  }),
];
