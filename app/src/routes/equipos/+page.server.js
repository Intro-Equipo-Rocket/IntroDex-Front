import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {
    const pagina = params.pagina || 1;
    const cantidadEquipos = 5;
    const response = await fetch(`http://127.0.0.1:8000/equipos/pagina/${pagina}?cantidad_equipos=${cantidadEquipos}`);
    if (!response.ok) {
        throw error(response.status, 'Could not fetch the list of Equipos');
    }
    const equipos = await response.json();
    return { equipos };
};