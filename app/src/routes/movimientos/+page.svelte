<script>
    export let data;
    console.log(data);
</script>

<h1>Movimientos</h1>
<form method='GET' action="?/show">
    <label for="id">ID:</label>
    <input type="text" id="id" name="id">
</form>
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
            </div>
    {/if}
{:else}
    <h2 class="error_msg">{data.status}: {data.error}</h2>
{/if}
<style>
    .error_msg {
        margin: 20px auto;
    }
    .datos_movimiento {
        color: white;
        display: grid;
        padding: 20px 55px;
        width: 50%;
        height: 50%;
        border-radius: 5px;
        margin: 20px auto;
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
        font-size: 2rem;
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