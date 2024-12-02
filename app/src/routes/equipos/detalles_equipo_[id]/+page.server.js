import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const url = new URL(`http://localhost:8000/equipos/id/${params.id}`);
  const response = await fetch(url);

  if (!response.ok) {
    throw error(response.status, `Could not fetch data for ${params.id}`);
  }

  const equipo = await response.json();
  console.log(equipo)
  return {
    equipo
  };
}


