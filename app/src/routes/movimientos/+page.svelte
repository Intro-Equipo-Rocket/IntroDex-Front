<script>
    import Typeahead from 'svelte-typeahead/src/Typeahead.svelte';
    export let data;

    let entry_nombre = '';
    let lista_movimientos = data.lista_movimientos.map(movimiento => movimiento.nombre);
    let lista_filtrada_movim = [];
    let movim_seleccionado = null;

    function CompararInput(event) {
        entry_nombre = event.target.value;
        lista_filtrada_movim = lista_movimientos.filter(suggestion =>
            suggestion.toLowerCase().includes(entry_nombre.toLowerCase())
        );
    }

    function FiltrarInput(suggestion) {
        movim_seleccionado = suggestion;
        entry_nombre = suggestion;
        lista_filtrada_movim = [];
    }

    $: if (data) {
        document.body.style.cursor = 'default';
    }
</script>

<div class="form_movimientos" on:submit={() => {
    document.body.style.cursor = 'wait';
    setTimeout(() => {
        document.getElementById('id').value = '';
    }, 0);
}}>
    <form class="buscar_id" method='GET' action="?/show_id">
        <label for="id">Buscar por id:</label>
        <input type="text" id="id" name="id">
        <button type="submit">Buscar</button>
    </form>
    <div class="buscar_nombre">
        <div class="typeahead">
            <Typeahead
                items={lista_filtrada_movim}
                label="Buscar por nombre:"
                bind:value={entry_nombre}
                on:input={CompararInput}
                on:select={FiltrarInput}
                placeholder="Buscar..."
            />
        </div>
        {#if entry_nombre && lista_filtrada_movim.length > 0}
            <ul class="suggestions">
                {#each lista_filtrada_movim as item}
                    <li on:click={() => FiltrarInput(item)}>{item}</li>
                {/each}
            </ul>
        {/if}
        <form method='GET' action="?/show_name" on:submit={() => entry_nombre = ''}>
            <input type="hidden" name="nombre" value="{movim_seleccionado}">
            <button type="submit">Buscar</button>
        </form>
    </div>
</div>

{#if !data.error}
    {#if data.movimiento}
        <div class="datos_movimiento {data.movimiento.class_tipo.nombre}">
            <span class="movim_nombre">{data.movimiento.nombre}</span>
            <div class="datos_movim_numericos">
                <span class="movim_precision">Precisión
                    {#if data.movimiento.precision}
                        {data.movimiento.precision}%
                    {:else}
                        N/A
                    {/if}
                </span>
                <span class="movim_potencia">Potencia
                    {#if data.movimiento.potencia}
                        {data.movimiento.potencia}
                    {:else}
                        N/A
                    {/if}
                </span>
                <span class="movim_usos">Usos
                    {#if data.movimiento.usos}
                        {data.movimiento.usos}
                    {:else}
                        N/A
                    {/if}</span>
            </div>
            {#if data.movimiento.class_categoria.nombre == "físico"}
                <img class="movim_categoria" src="https://raw.githubusercontent.com/msikma/pokesprite/refs/heads/master/misc/seals/gen4/move-physical.png" alt="Físico.png">
            {:else if data.movimiento.class_categoria.nombre == "especial"}
                <img class="movim_categoria" src="https://raw.githubusercontent.com/msikma/pokesprite/refs/heads/master/misc/seals/gen4/move-special.png" alt="Especial.png">
            {:else if data.movimiento.class_categoria.nombre == "estado"}
                <img class="movim_categoria" src="https://raw.githubusercontent.com/msikma/pokesprite/refs/heads/master/misc/seals/gen4/move-status.png" alt="Estado.png">
            {/if}
            <span class="efecto">{data.movimiento.class_efecto.descripcion}</span>
        </div>
        <h1>Pokemones</h1>
        {#if !data.pokemones}
            <h2 class="error_msg">No hay pokemones que aprendan este movimiento</h2>
        {:else}
            <div class="table-responsive">
                <table class="tabla_pokemones">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Metodo</th>
                            <th>Nivel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each data.pokemones as pokemon}
                            <tr>
                                <td><img src={pokemon.imagen} alt={pokemon.nombre}></td>
                                <td><a href="../pokemons/{pokemon.nombre}">{pokemon.nombre}</a></td>
                                <td>{#each pokemon.tipos as tipos}
                                    <p class="pokemon-tipo {tipos.nombre.toLowerCase()}">{tipos.nombre}</p>
                                {/each}</td>
                                <td>{pokemon.movimientos[0].metodo.nombre}</td>
                                {#if pokemon.movimientos[0].nivel}
                                    <td>{pokemon.movimientos[0].nivel}</td>
                                {:else if pokemon.movimientos[0].metodo.nombre == "Nivel"}
                                    <td>{pokemon.movimientos[0].nivel}</td>
                                {:else}
                                    <td>N/A</td>
                                {/if}
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    {:else}
        <h2 class="error_msg">Esperando datos...</h2>
    {/if}
{:else}
    <h2 class="error_msg">{data.status}: {data.error}</h2>
{/if}


<style>
    .form_movimientos {
        display: grid;
        grid-template-columns: 0.5fr 1.5fr;
        gap: 10px;
        margin: 20px auto;
        width: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 20px 0;
        border-radius: 5px;
        text-align: center;
        margin-top: 50px;
    }
    .buscar_nombre {
        grid-column: 2;
        color: black;
        display: grid;
    }
    .typeahead {
        display: inline-block;
        width: 75%;
        padding: 10px;
        justify-self: center;
    }
    .suggestions {
        position: absolute;
        z-index: 1;
        background-color: white;
        color: black;
        border: 1px solid #ccc;
        max-height: 150px;
        overflow-y: auto;
        margin-top: 68px;
        width: 25%;
        justify-self: center;
        padding: 0 10px;
    }
    .suggestions li {
        list-style: none;
        display: list-item;
        cursor: pointer;
        text-align: left;
    }
    .suggestions li:hover {
        background-color: #f1f1f1;
    }
    button {
        padding: 10px;
        background-color: #555;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        justify-self: center;
        align-self: center;
    }
    form {
        display: grid;
        gap: 10px;
        width: 90%;
        justify-self: center;
        align-self: center;
    }
    input {
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #333;
    }
    .buscar_id {
        grid-column: 1;
        justify-items: center;
    }
    .buscar_id input {
        width: 50%;
    }
    h1 {
        margin-left: 20px;
        color: white;
        text-decoration: underline;
        text-shadow:
            -0.8px -0.8px 0 #444,  
             0.8px -0.8px 0 #444,
            -0.8px  0.8px 0 #444,
             0.8px  0.8px 0 #444;
    }
    .error_msg {
        color: white;
        width: 50%;
        margin: 20px auto;
        text-align: center;
        background-color: #ff0000;
        padding: 10px;
        border-radius: 5px;
        margin-top: 50px;
        margin-bottom: 37%;
    }
    .tabla_pokemones {
        width: 50%;
        margin: 20px auto;
        border-collapse: collapse;
        font-family: Arial, Helvetica, sans-serif;
    }
    .tabla_pokemones thead {
        background-color: #333;
        color: white;
    }
    .tabla_pokemones tbody {
        background-color: #f2f2f2;
    }
    .tabla_pokemones th, .tabla_pokemones td {
        border: 1px solid #333;
        padding: 5px;
        text-align: center;
        text-transform: capitalize;
        align-items: center;
        justify-items: center;
        align-self: center;
    }
    .tabla_pokemones th {
        font-size: 1.2rem;
    }
    .pokemon-tipo {
        margin: 5px;
    }
    .datos_movimiento {
        color: white;
        display: grid;
        padding: 20px 55px;
        width: 50%;
        height: 50%;
        border-radius: 5px;
        margin: 20px auto;
        align-self: center;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        font-family: Arial, Helvetica, sans-serif;
        text-transform: capitalize;
        text-shadow:
            -0.8px -0.8px 0 #444,  
             0.8px -0.8px 0 #444,
            -0.8px  0.8px 0 #444,
             0.8px  0.8px 0 #444;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
        align-items: center;
        justify-items: center;
    }
    .movim_nombre {
        font-size: 3rem;
        text-align: center;
        padding: 35px 20px 5px;
        grid-column: 1 / 8;
        width: 100%;
    }
    .datos_movim_numericos {
        grid-column: 1 / 4;
        grid-row: 2;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        justify-items: center;
        border: 1px solid white;
        border-radius: 5px;
        padding: 5px;
        background-color: rgba(0, 0, 0, 0.5);
        gap: 5px;
    }
    .movim_precision {
        font-size: 13px;
        text-align: center;
        grid-column: 1;
        width: min-content;
    }
    .movim_potencia {
        font-size: 13px;
        text-align: center;
        grid-column: 2;
        width: min-content;
    }
    .movim_usos {
        font-size: 13px;
        text-align: center;
        grid-column: 3;
        width: min-content;
    }
    .movim_categoria {
        grid-column: 6 / 8;
        grid-row: 2;
        width: 66px;
        height: 30px;
        justify-self: center;
    }
    .efecto {
        font-size: 1rem;
        text-align: center;
        text-transform: none;
        padding: 20px 10px;
        grid-column: 1 / 8;
        width: 100%;
        border: 1px solid white;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .Normal {
        background-color: #A8A878;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_0_normal.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_0_normal.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_0_normal.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_0_normal.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Fuego {
        background-color: #F08030;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_9_fire.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_9_fire.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_9_fire.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_9_fire.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Agua {
        background-color: #6890F0;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_10_water.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_10_water.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_10_water.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_10_water.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Planta {
        background-color: #78C850;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_11_grass.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_11_grass.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_11_grass.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_11_grass.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Eléctrico {
        background-color: #F8D030;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_12_electric.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_12_electric.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_12_electric.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_12_electric.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Hielo {
        background-color: #98D8D8;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_14_ice.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_14_ice.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_14_ice.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_14_ice.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Lucha {
        background-color: #C03028;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_1_fighting.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_1_fighting.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_1_fighting.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_1_fighting.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Veneno {
        background-color: #A040A0;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_3_poison.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_3_poison.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_3_poison.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_3_poison.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Tierra {
        background-color: #E0C068;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_4_ground.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_4_ground.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_4_ground.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_4_ground.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Volador {
        background-color: #A890F0;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_2_flying.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_2_flying.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_2_flying.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_2_flying.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Psíquico {
        background-color: #F85888;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_13_psychic.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_13_psychic.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_13_psychic.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_13_psychic.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Bicho {
        background-color: #A8B820;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_6_bug.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_6_bug.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_6_bug.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_6_bug.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Roca {
        background-color: #B8A038;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_5_rock.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_5_rock.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_5_rock.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_5_rock.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Fantasma {
        background-color: #705898;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_7_ghost.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_7_ghost.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_7_ghost.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_7_ghost.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Dragón {
        background-color: #7038F8;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_15_dragon.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_15_dragon.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_15_dragon.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_15_dragon.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Siniestro {
        background-color: #705848;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_16_dark.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_16_dark.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_16_dark.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_16_dark.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Acero {
        background-color: #B8B8D0;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_8_steel.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_8_steel.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_8_steel.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_8_steel.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Hada {
        background-color: #EE99AC;
        background-image: url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_17_fairy.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_17_fairy.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_17_fairy.png'),
                            url('https://raw.githubusercontent.com/PokeMiners/pogo_assets/refs/heads/master/Images/Types/ico_17_fairy.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
    .Shadow {
        background-color: #181818;
        background-image: url('https://cdn.pixabay.com/photo/2018/05/18/15/43/pokemon-3411387_960_720.png'),
                            url('https://cdn.pixabay.com/photo/2018/05/18/15/43/pokemon-3411387_960_720.png'),
                            url('https://cdn.pixabay.com/photo/2018/05/18/15/43/pokemon-3411387_960_720.png'),
                            url('https://cdn.pixabay.com/photo/2018/05/18/15/43/pokemon-3411387_960_720.png');
        background-position: top left, bottom left, top right, bottom right;
        background-repeat: no-repeat;
        background-size: 35px;
    }
</style>