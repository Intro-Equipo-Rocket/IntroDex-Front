import { error, json } from '@sveltejs/kit';


export const actions = {
  show_id: async ({ request }) => {
    const form = await request.formData();
    const id = form.get("id");
    const url = `http://127.0.0.1:8000/movimientos/id/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw error(response.status, 'Could not fetch the Movimiento');
    }
    const movimiento = await response.json();
    return json({ movimiento });
  },
  show_name: async ({ request }) => {
    const form = await request.formData();
    const nombre = form.get("nombre");
    const url = `http:////127.0.0.1:8000/movimientos/nombre/${nombre}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw error(response.status, 'Could not fetch the Movimiento');
    }
    const movimiento = await response.json();
    return json({ movimiento });
  }
};


async function primer_load({ url }) {
  const id = url.searchParams.get('id');
  const nombre = url.searchParams.get('nombre');
  if (id) {
    const url_movimientos = `http://127.0.0.1:8000/movimientos/id/${id}`;
    const response_movimientos = await fetch(url_movimientos);
    if (!response_movimientos.ok) {
      return {
        status: response_movimientos.status,
        error: 'Could not fetch the Movimiento'
      };
    }
    const data_movimiento = await response_movimientos.json();
    const url_pokemones = `http://127.0.0.1:8000/movimientos/${id}/pokemon`;
    const response_pokemones = await fetch(url_pokemones);
    if (!response_pokemones.ok) {
      return {
        movimiento: data_movimiento,
        pokemones: null
      };
    }
    const data_pokemones = await response_pokemones.json();
    return {
        movimiento: data_movimiento,
        pokemones: data_pokemones
    };
  }
  else if (nombre) {
    const url_movimientos = `http://127.0.0.1:8000/movimientos/nombre/${nombre}`;
    const response_movimientos = await fetch(url_movimientos);
    if (!response_movimientos.ok) {
      return {
        status: response_movimientos.status,
        error: 'Could not fetch the Movimiento'
      };
    }
    const data_movimiento = await response_movimientos.json();
    const url_pokemones = `http://127.0.0.1:8000/movimientos/${data_movimiento.id}/pokemon`
    const response_pokemones = await fetch(url_pokemones);
    if (!response_pokemones.ok) {
      return {
        movimiento: data_movimiento,
        pokemones: null
      };
    }
    const data_pokemones = await response_pokemones.json();
    return {
        movimiento: data_movimiento,
        pokemones: data_pokemones
    };
  }
}

async function segundo_load() {
  const url = 'http://127.0.0.1:8000/movimientos/'
  const response = await fetch(url);
  if (!response.ok) {
    return {
      status: response.status,
      error: 'Could not fetch the Movimientos'
    };
  }
  const data = await response.json();
  return { lista_movimientos: data };
}

export async function load({ url }) {
  const primerData = await primer_load({ url });
  const segundoData = await segundo_load();
  return { ...primerData, ...segundoData };
}