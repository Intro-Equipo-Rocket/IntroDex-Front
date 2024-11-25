// export const actions = {
//   show: async ({ request }) => {
//     const form = await request.formData();
//     const url = new URL(`http://127.0.0.1:8000/movimientos/id/${form.get("id")}`);
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw error(response.status, 'Could not fetch the Movimiento');
//     }
//     const movimiento_data = await response.json();
//     return {
//       data: movimiento_data
//     };
//   }
// };

import { error, json } from '@sveltejs/kit';

export const actions = {
  show: async ({ request }) => {
    const form = await request.formData();
    const id = form.get("id");
    const url = `http://127.0.0.1:8000/movimientos/id/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw error(response.status, 'Could not fetch the Movimiento');
    }
    const movimiento = await response.json();
    return json({ movimiento });
  }
};

export async function load({ url }) {
  const id = url.searchParams.get('id');
  if (id) {
    const apiUrl = `http://127.0.0.1:8000/movimientos/id/${id}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return {
        status: response.status,
        error: 'Could not fetch the Movimiento'
      };
    }
    const data_movimiento = await response.json();
    console.log(data_movimiento)
    return {
      movimiento: data_movimiento
    };
  }
  return {
    movimiento: null
  };
}