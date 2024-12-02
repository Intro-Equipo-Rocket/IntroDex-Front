import { error } from '@sveltejs/kit';

    export const load = async ({ fetch, params, url }) => {
        const pokemonsResponse = await fetch('http://127.0.0.1:8000/pokemons/');
        if (!pokemonsResponse.ok) {
            throw error(pokemonsResponse.status, 'No se pudo obtener la lista de pokemons');
        }
        const pokemons = await pokemonsResponse.json();

        const naturalezasResponse = await fetch('http://127.0.0.1:8000/naturalezas/');
        if (!naturalezasResponse.ok) {
            throw error(naturalezasResponse.status, 'No se pudo obtener la lista de naturalezas');
        }
        const naturalezas = await naturalezasResponse.json();

        return { pokemons, naturalezas };
    }
  
    export const actions = {
        create: async ({ request }) => {
            const data = await request.formData();

            const id_equipo = parseInt(data.get('id'));
            const nombre_equipo = data.get('nombre');
            const generacion_equipo = parseInt(data.get('generacion'));
            const integrantes = JSON.parse(data.get('integrantes') || '[]');

            const queryParams = new URLSearchParams({
                id_equipo,
                nombre_equipo,
                generacion_equipo
            });

            integrantes.forEach((integrante, index) => {
                if (integrante.id_pkm !== null) {
                    queryParams.append(`id_pkm_${index + 1}`, integrante.id_pkm);
                }
                if (integrante.id_naturaleza !== null) {
                    queryParams.append(`id_naturaleza_${index + 1}`, integrante.id_naturaleza);
                }
            });

            const body = JSON.stringify(transformarIntegrantes(integrantes));

            const response = await fetch(`http://localhost:8000/equipos/?${queryParams.toString()}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transformarIntegrantes(integrantes))
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error en la respuesta de la API:', errorText);
                throw new Error(`Response status: ${response.status}`);
            }
        }
    }

    function transformarIntegrantes(integrantes) {
    const body = {};

    integrantes.forEach((integrante, index) => {
        const idx = index + 1;

        const evs = integrante.evs || {
            vida: 0,
            ataque: 0,
            defensa: 0,
            ataque_especial: 0,
            defensa_especial: 0,
            velocidad: 0,
        };

        body[`id_movimientos_pkm_${idx}`] = integrante.id_movimientos_pkm;
        body[`evs_pkm_${idx}`] = evs;
    });

    return body;
    }