import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const url = new URL(`http://127.0.0.1:8000/pokemons/nombre/${params.nombre}`);
  const response = await fetch(url);

  if (!response.ok) {
    throw error(response.status, `Could not fetch data for ${params.nombre}`);
  }

  const pokemon = await response.json();

  return {
    pokemon
  };
}
