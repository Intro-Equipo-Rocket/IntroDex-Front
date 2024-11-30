<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    export let data;
    let { equipos, pagina, cantidadEquipos } = data;

    $: {
        const currentPage = get(page);
        const newPage = parseInt(currentPage.params.pagina) || 1;
        const newCantidadEquipos = parseInt(currentPage.url.searchParams.get('cantidad_equipos')) || 5;

        if (newPage !== pagina || newCantidadEquipos !== cantidadEquipos) {
            pagina = newPage;
            cantidadEquipos = newCantidadEquipos;
            equipos = data.equipos;
        }
    }

    function cambiarPagina(nuevaPagina) {
        goto(`/equipos/${nuevaPagina}?cantidad_equipos=${cantidadEquipos}`);
    }

    function truncate(str, maxlength) {
        return (str.length > maxlength) ?
            str.slice(0, maxlength - 1) + '…' : str;
    }
</script>

<main>
    <h1>Equipos - Página {pagina}</h1>

    {#if equipos.length > 0}
        {#each equipos as equipo}
        <div class="team-container">
            <ul class="team-list">
                <li>
                    <div class="team team-hover">
                        <span>[Gen {equipo.generacion}] <strong>{truncate(equipo.nombre, 30)}</strong> [{equipo.id}]</span>
                            <ul>
                                {#each equipo.integrantes as integrante}               
                                    <img class="picon" src="{integrante.pokemon.imagen}" alt="{integrante.pokemon.nombre}" />                                                                         
                                {/each}
                            </ul>
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
