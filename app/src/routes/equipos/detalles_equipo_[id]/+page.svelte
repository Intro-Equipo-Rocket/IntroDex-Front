<script>
	function capitalizarPalabra(texto) {
		if (!texto) return '';

		return texto.charAt(0).toUppercase() + texto.slice(1);
	}

	function numeroAleatorio(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function partidasGanadasPerdidas(partidas) {
		const ganadas = numeroAleatorio(1, partidas);
		const perdidas = partidas - ganadas;

		return { ganadas, perdidas };
	}

	const cantidad_partidas = numeroAleatorio(1, 200);
	const historial = partidasGanadasPerdidas(cantidad_partidas);

	export let data;
</script>

<main>
	<h1 class="title">Información Equipo - {data.equipo.id}</h1>
	<h2 class="subtitle">{data.equipo.nombre}</h2>

	<section class="historial">
		<div class="label-total">
			<span class="value">Combates:</span>
			<span class="value">{cantidad_partidas}</span>
		</div>
		<div class="label-wins">
			<span class="value">Ganados:</span>
			<span class="value">{historial.ganadas}</span>
		</div>
		<div class="label-loses">
			<span class="value">Perdidos:</span>
			<span class="value">{historial.perdidas}</span>
		</div>
	</section>

	<h2 class="subtitle">En {data.equipo.generacion}° Generación</h2>
	<section class="integrantes">
		{#each data.equipo.integrantes as integrante}
			<article class="integrante-card">
				<img
					src={integrante.pokemon.imagen}
					alt={`Imagen de ${integrante.pokemon.nombre}`}
					class="integrante-imagen"
				/>

				<h2>{integrante.pokemon.nombre}</h2>
				<li><strong>Naturaleza: </strong> {integrante.naturaleza.nombre}</li>

				<h3>Movimientos:</h3>
				<ul class="lista-movimientos">
					{#each integrante.movimientos as movimiento}
						<li>{movimiento.nombre}</li>
					{/each}
				</ul>

				<h3>Evs:</h3>
				<ul class="lista-estadisticas">
					<li><strong>Vida:</strong> {integrante.evs.vida}</li>
					<li><strong>Ataque:</strong> {integrante.evs.ataque}</li>
					<li><strong>Defensa:</strong> {integrante.evs.defensa}</li>
					<li><strong>Ataque Especial:</strong> {integrante.evs.ataque_especial}</li>
					<li><strong>Defensa Especial:</strong> {integrante.evs.defensa_especial}</li>
					<li><strong>Velocidad:</strong> {integrante.evs.velocidad}</li>
				</ul>
			</article>
		{/each}
	</section>
</main>

<style>
	.historial {
		margin-top: 20px;
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;
		border-radius: 8px;
		align-self: center;
		width: 60%;
		margin-left: auto;
		margin-right: auto;
	}

	.label-total {
		display: flex;
		background-color: #494949;
		border-radius: 8px;
		justify-content: space-between;
		width: 90%;
		margin: 10px 0;
		padding: 3px;
	}

	.label-total:hover {
		transform: scale(1.01);
		background-color: #5a5a5a;
	}

	.label-wins {
		display: flex;
		background-color: #494949;
		border-radius: 8px;
		justify-content: space-between;
		width: 90%;
		margin: 10px 0;
		padding: 3px;
	}

	.label-wins:hover {
		transform: scale(1.01);
		background-color: #f44336;
	}

	.label-loses {
		display: flex;
		background-color: #494949;
		border-radius: 8px;
		justify-content: space-between;
		width: 90%;
		margin: 10px 0;
		padding: 3px;
	}

	.label-loses:hover {
		transform: scale(1.01);
		background-color: #3643f4;
	}

	.value {
		font-size: 1rem;
		color: #fff;
		padding: 5px 10px;
		border-radius: 4px;
		font-weight: bold;
	}
</style>
