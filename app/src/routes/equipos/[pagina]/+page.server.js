import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params, url }) => {
	const pagina = parseInt(params.pagina) || 1;
	const cantidadEquipos = parseInt(url.searchParams.get('cantidad_equipos')) || 5;

	const response = await fetch(
		`http://127.0.0.1:8000/equipos/pagina/${pagina}?cantidad_equipos=${cantidadEquipos}`
	);
	if (!response.ok) {
		throw error(response.status, 'No se pudo obtener la lista de equipos');
	}

	const equipos = await response.json();
	return { equipos, pagina, cantidadEquipos };
};
