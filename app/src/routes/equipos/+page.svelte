<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { writable } from 'svelte/store';
    import Typeahead from 'svelte-typeahead';

    export let data;
    let { equipos, pagina, cantidadEquipos } = data;
    let equipo = writable({
        id: null,
        nombre: '', 
        generacion: null,
        integrantes: [
            {
                id_pkm: null, 
                id_movimientos_pkm: [],
                id_naturaleza: null, 
                evs: {
                    vida: 0, 
                    ataque: 0,
                    defensa: 0,
                    ataque_especial: 0,
                    defensa_especial: 0,
                    velocidad: 0,
                },
            },
        ],
    });
    let movimientosTransformados = []; 

    $: {
        const paginaActual = get(page);
        const nuevaPagina = parseInt(paginaActual.params.pagina) || 1;
        const cantidadEquipos = 5;
        
        if (nuevaPagina !== pagina) {
            pagina = nuevaPagina;
            equipos = data.equipos;
        }
    }

    function agregarIntegrante() {
        const nuevoIntegrante = {
            id_pkm: null,
            id_movimientos_pkm: [],
            id_naturaleza: null,
            evs: {
                vida: 0,
                ataque: 0,
                defensa: 0,
                ataque_especial: 0,
                defensa_especial: 0,
                velocidad: 0,
            },
        };

        equipo.update((current) => {
            return {
                ...current,
                integrantes: [...current.integrantes, nuevoIntegrante],
            };
        });
    }

    function quitarIntegrante(index) {
        $equipo.integrantes = $equipo.integrantes.filter((_, i) => i !== index);
    }

    async function cargarMovimientos(pokemonId) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/pokemons/${pokemonId}/movimientos`);
            if (!response.ok) throw new Error('Error al cargar movimientos');
            const data = await response.json();
            movimientosTransformados = data.map(item => ({
                id: item.movimientos.id,
                nombre: item.movimientos.nombre,
            }));
        } catch (error) {
            console.error('Error al cargar movimientos:', error);
        }
    }

    function validarDatos() {
        let valido = true;

        $equipo.integrantes.forEach((integrante, index) => {
            const sumaEVs =
                integrante.evs.vida +
                integrante.evs.ataque +
                integrante.evs.defensa +
                integrante.evs.ataque_especial +
                integrante.evs.defensa_especial +
                integrante.evs.velocidad;

            if (sumaEVs > 510) {
                valido = false;
            }

            const cantidadMovimientos = integrante.id_movimientos_pkm.length;

            if (cantidadMovimientos < 1 || cantidadMovimientos > 4) {
                valido = false;
            }
        });

        return valido;
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
    <h1>Crear Equipo</h1>
    <form method="POST" action="?/create"> 
        <h3>Datos del equipo:</h3>
        <label>
            ID:
            <input
                name="id"
                type="integer"
                bind:value={$equipo.id}
                autocomplete="off"
                required
            />
        </label>
        <label>
            Nombre:
            <input
                name="nombre"
                type="text"
                bind:value={$equipo.nombre}
                autocomplete="off"
                required
            />
        </label>
        <label>
            Generacion:
            <input
                name="generacion"
                type="integer"
                bind:value={$equipo.generacion}
                min="1"
                max="8"
                autocomplete="off"
                required
            />
        </label>
        <div>
            <input type="hidden" name="integrantes" value={JSON.stringify($equipo.integrantes)} />
            <h3>Integrantes:</h3>
            {#each $equipo.integrantes as integrante, index}
                <fieldset>
                    <legend>Integrante {index + 1}</legend>
                    <Typeahead
                        label="Seleccionar pokemon"
                        placeholder={`Buscar pokemon por nombre/ID`}
                        data={data.pokemons}
                        extract={(pokemon) => `${pokemon.id} ${pokemon.nombre}`}
                        on:select={({ detail }) => {
                            $equipo.integrantes[index].id_pkm = detail.original.id;
                            cargarMovimientos($equipo.integrantes[index].id_pkm);
                        }}
                        inputAfterSelect="clear"
                    />
                    <div>
                        <label for="pokemon-name-{index}">ID:</label>
                        <input
                            id="pokemon-name-{index}"
                            type="text"
                            bind:value={$equipo.integrantes[index].id_pkm}
                            required
                            readonly
                        />
                    </div>
                    <Typeahead
                        label="Seleccionar Movimiento"
                        placeholder="Buscar movimiento por nombre"
                        data={movimientosTransformados}
                        extract={(movimiento) => movimiento.nombre}
                        on:select={({ detail }) => {
                            if (!$equipo.integrantes[index].id_movimientos_pkm.includes(detail.original.id)) {
                                $equipo.integrantes[index].id_movimientos_pkm = [
                                    ...$equipo.integrantes[index].id_movimientos_pkm,
                                    detail.original.id
                                ];
                            }
                        }}
                        inputAfterSelect="clear"
                    />
                    {#if integrante.id_movimientos_pkm.length > 0}
                    <h3>Movimientos Seleccionados [min 1 / max 4]</h3>
                        <ul>
                            {#each integrante.id_movimientos_pkm as movimientoId, idx}
                                <li>
                                    Movimiento ID: {movimientoId}
                                    <button type="button" on:click={() => {
                                        $equipo.integrantes[index].id_movimientos_pkm = 
                                            $equipo.integrantes[index].id_movimientos_pkm.filter((_, i) => i !== idx);
                                    }}>
                                        Quitar
                                    </button>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                    <Typeahead
                        label="Seleccionar naturaleza"
                        placeholder={`Buscar naturaleza por nombre/ID`}
                        data={data.naturalezas}
                        extract={(naturaleza) => `${naturaleza.id} ${naturaleza.nombre}`}
                        on:select={({ detail }) => $equipo.integrantes[index].id_naturaleza = detail.original.id}
                        inputAfterSelect="clear"
                    />
                    <div>
                        <label for="naturaleza-name-{index}">ID:</label>
                        <input
                            id="naturaleza-name-{index}"
                            type="text"
                            bind:value={$equipo.integrantes[index].id_naturaleza}
                            readonly
                            required
                        />
                    </div>
                    <div class="ev-container">
                        <label for="vida-{index}">Vida:</label>
                        <input
                            id="vida-{index}"
                            type="number"
                            bind:value={$equipo.integrantes[index].evs.vida}
                            min="0"
                            max="255"
                            required
                        />

                        <label for="ataque-{index}">Ataque:</label>
                        <input
                            id="ataque-{index}"
                            type="number"
                            bind:value={$equipo.integrantes[index].evs.ataque}
                            min="0"
                            max="255"
                            required
                        />

                        <label for="defensa-{index}">Defensa:</label>
                        <input
                            id="defensa-{index}"
                            type="number"
                            bind:value={$equipo.integrantes[index].evs.defensa}
                            min="0"
                            max="255"
                            required
                        />

                        <label for="ataque_especial-{index}">Atq_Esp:</label>
                        <input
                            id="ataque_especial-{index}"
                            type="number"
                            bind:value={$equipo.integrantes[index].evs.ataque_especial}
                            min="0"
                            max="255"
                            required
                        />

                        <label for="defensa_especial-{index}">Def_Esp:</label>
                        <input
                            id="defensa_especial-{index}"
                            type="number"
                            bind:value={$equipo.integrantes[index].evs.defensa_especial}
                            min="0"
                            max="255"
                            required
                        />

                        <label for="velocidad-{index}">Velocidad:</label>
                        <input
                            id="velocidad-{index}"
                            type="number"
                            bind:value={$equipo.integrantes[index].evs.velocidad}
                            min="0"
                            max="255"
                            required
                        />
                    </div>
                    <p class="sum-container">Suma de EVs: {
                            $equipo.integrantes[index].evs.vida +
                            $equipo.integrantes[index].evs.ataque +
                            $equipo.integrantes[index].evs.defensa +
                            $equipo.integrantes[index].evs.ataque_especial +
                            $equipo.integrantes[index].evs.defensa_especial +
                            $equipo.integrantes[index].evs.velocidad
                        } / 510
                    </p>
                    <button type="button" on:click={() => quitarIntegrante(index)}>
                        Quitar Integrante
                    </button>
                </fieldset>
            {/each}
        </div>
        {#if $equipo.integrantes.length < 6}
            <button type="button" on:click={agregarIntegrante}>
                Agregar Integrante
            </button>
        {/if}
        {#if $equipo.integrantes.length >= 1}
        <button type="submit" disabled={!validarDatos()}>
            Confirmar
        </button>
        {/if}
    </form>

    <h1>Equipos - Página {pagina}</h1>

    {#if equipos.length > 0}
    {#each equipos as equipo}
    <div class="team-container">
            <ul class="team-list">
                <li>
                    <div class="team-hover">
                        <span>[Gen {equipo.generacion}] <strong>{truncate(equipo.nombre, 30)}</strong> [{equipo.id}]</span>
                        <ul>
                            {#each equipo.integrantes as integrante}               
                                <img src="{integrante.pokemon.imagen}" alt="{integrante.pokemon.nombre}" />                                                                         
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

<style>

form{
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
form h3{
  margin-top: 20px;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
}
form label{
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
}
form input[type="text"],
form input[type="number"],
form input[type="integer"]{
  width: calc(100% - 20px);
  padding: 8px 10px;
  margin-bottom: 15px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}
form button{
  padding: 10px 20px;
  font-size: 14px;
  color: #fff;
  background-color: #2969ad;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
form button:hover{
  background-color: #03468e;
}
form button[type="button"]{
  background-color: #494949;
}

form button[type="button"]:hover{
  background-color: #202020;
}
form button:disabled {
  background-color: #8e8e8e;
  cursor: not-allowed;
}
fieldset {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #fff;
}
legend {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.ev-container {
  display: flex;
  justify-content: space-around;
}
.ev-container input[type="number"] {
    height: 25%;
    width: auto;
}
.sum-container {
  font-weight: bold;
  margin-top: 10px;
  color: #555;
  text-align: right;
}

</style>