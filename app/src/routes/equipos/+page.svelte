<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';

    export let data;
    let { equipos, pagina, cantidadEquipos } = data;

    $: {
        const paginaActual = get(page);
        const nuevaPagina = parseInt(paginaActual.params.pagina) || 1;
        const cantidadEquipos = 5;
        
        if (nuevaPagina !== pagina) {
            pagina = nuevaPagina;
            equipos = data.equipos;
        }
    }

    async function eliminarEquipo(equipoId) {
        if (confirm(`Estas seguro de eliminar el equipo con id ${equipoId}?`)) {
            try {
                const response = await fetch(`http://localhost:8000/equipos/eliminar/${equipoId}`, { method: 'DELETE',})

                if (!response.ok) {
                    const error = await response.json();
                    console.error('Error al borrar el equipo:', error);
                    alert(`Error: ${error.detail}`);
                    return;
                }

                equipos = equipos.filter((equipo) => equipo.id !== equipoId);
                alert('Equipo eliminado exitosamente.');
            } catch(error) {
                console.error('Error interno:', error)
                alert('Hubo un error al eliminar el equipo');
            }
        }
    }

    function cambiarPagina(nuevaPagina){
        goto(`/equipos/${nuevaPagina}?cantidad_equipos=${cantidadEquipos}`);
    }

    function truncate(str, maxlength){
        return (str.length > maxlength) ?
            str.slice(0, maxlength - 1) + '…' : str;
    }
</script>

<main>
    <h1 class="title">Glosario de equipos</h1>
    <h2 class="subtitle">Página - {pagina}</h2>

    {#if equipos.length > 0}
    {#each equipos as equipo}
    <div class="team-container">
            <ul class="team-list">
                <li>
                    <div class="team-hover">
                        <span>[Gen {equipo.generacion}] <strong>{truncate(equipo.nombre, 30)}</strong> [{equipo.id}]</span>
                        <ul class="team-members">
                            {#each equipo.integrantes as integrante}               
                                <img class="picon" src="{integrante.pokemon.imagen}" alt="{integrante.pokemon.nombre}" />                                                                     
                            {/each}   
                        </ul>
                        <div>
                            <button class="team-delete-button" on:click={() => eliminarEquipo(equipo.id)}>Eliminar</button> 
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        {/each}
        <nav>
            {#if pagina > 1}
                <button on:click={() => cambiarPagina(pagina - 1)}>Anterior</button>
            {/if}
            {#if equipos.length === cantidadEquipos}
                <button on:click={() => cambiarPagina(pagina + 1)}>Siguiente</button>
            {/if}
        </nav>
    {:else}
        <p>No hay equipos para mostrar en esta página.</p>
    {/if}
</main>