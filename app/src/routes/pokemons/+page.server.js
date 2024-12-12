import { error } from '@sveltejs/kit';

export async function load() {
	const url = new URL('http://127.0.0.1:8000/pokemons/');
	const response = await fetch(url);

	if (!response.ok) {
		throw error(response.status, 'Could not fetch the list of Pokemons');
	}

	const pokemons = await response.json();

	return {
		pokemons
	};
}
