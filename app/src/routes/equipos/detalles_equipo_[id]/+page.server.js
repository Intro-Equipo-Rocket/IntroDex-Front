export async function load({ params }) {
    const { id } = params;
    try {
        const response = await fetch(`http://localhost:8000/equipos/id/${id}`);
        if (!response.ok) {
            throw new Error(`Error al obtener los datos del equipo con ID ${id}`);
        }
        const equipo = await response.json();
        return { props: { equipo } };
    } catch (error) {
        console.error(error);
        throw error(500, 'Error al cargar los detalles del equipo');
    }
}
