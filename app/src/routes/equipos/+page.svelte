<script>
    export let data; // Esto contiene los datos cargados en +page.server.js
</script>

<main>
    <h1>Equipos</h1>
    {#if data.equipos.length > 0}
    <div class="team-container">
        <ul class="team-list">
            {#each data.equipos as equipo}
            <div class="team">
                <li>
                    [gen{equipo.generacion}]
                    <strong>{equipo.nombre}</strong>
                    <ul>
                        {#each equipo.integrantes as integrante}
                            <li>
                                <img src="{integrante.pokemon.imagen}" alt="{integrante.pokemon.nombre}"/>
                            </li>
                        {/each}
                    </ul>
                </li>
            </div>
            {/each}
        </ul>
    </div>
    {:else}
        <p>No hay equipos para mostrar en esta página.</p>
    {/if}
</main>


<style>

.team {
	width: 230px;
	height: 32px;
	padding: 0 5px;
	font-size: 9pt;
	text-align: left;
	font-family: Verdana, Helvetica, Arial, sans-serif;
	cursor: pointer;
}

.team-container {
	display: flex;
	left: 159px;
	top: 0;
	right: 0;
	bottom: 0;
	padding: 5px 0 5px 8px;
}
.team-list {
	list-style: none;
	margin: 0;
	padding: 0;
}
.team-list li {
	margin: 3px 0;
	padding: 0;
}

.team-list .team {
	display: inline-block;
	width: 350px;
	height: 49px;
	padding: 1px 6px 1px 6px;
	font-size: 8pt;
	text-align: center;
}

</style>