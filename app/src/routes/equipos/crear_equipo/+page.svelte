<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let data;

	let Typeahead;

	onMount(async () => {
		const module = await import('svelte-typeahead');
		Typeahead = module.default || module;
	});

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
					velocidad: 0
				}
			}
		]
	});
	let movimientosTransformados = [];

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
				velocidad: 0
			}
		};

		equipo.update((current) => {
			return {
				...current,
				integrantes: [...current.integrantes, nuevoIntegrante]
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
			movimientosTransformados = data.map((item) => ({
				id: item.movimientos.id,
				nombre: item.movimientos.nombre
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
</script>

<main>
	<form class="team-form" method="POST" action="?/create">
		<h3>Datos del equipo a crear:</h3>
		<label>
			ID:
			<input name="id" type="integer" bind:value={$equipo.id} autocomplete="off" required />
		</label>
		<label>
			Nombre:
			<input name="nombre" type="text" bind:value={$equipo.nombre} autocomplete="off" required />
		</label>
		<label>
			Generación:
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
					{#if Typeahead}
						<Typeahead
							label="Seleccionar pokemon"
							placeholder={`Buscar pokemon por nombre/ID`}
							data={data.pokemons}
							extract={(pokemon) => `${pokemon.id} ${pokemon.nombre}`}
							on:select={({ detail }) => {
								$equipo.integrantes[index].id_pkm = detail.original.id;
								$equipo.integrantes[index].nombre_pkm = detail.original.nombre;
								cargarMovimientos($equipo.integrantes[index].id_pkm);
							}}
							bind:value={$equipo.integrantes[index].nombre_pkm}
						/>
					{/if}
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
					{#if Typeahead}
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
					{/if}
					{#if integrante.id_movimientos_pkm.length > 0}
						<h3>Movimientos Seleccionados [min 1 / max 4]</h3>
						<ul>
							{#each integrante.id_movimientos_pkm as movimientoId, idx}
								<li>
									Movimiento ID: {movimientoId}
									<button
										type="button"
										on:click={() => {
											$equipo.integrantes[index].id_movimientos_pkm = $equipo.integrantes[
												index
											].id_movimientos_pkm.filter((_, i) => i !== idx);
										}}
									>
										Quitar
									</button>
								</li>
							{/each}
						</ul>
					{/if}
					{#if Typeahead}
						<Typeahead
							label="Seleccionar naturaleza"
							placeholder={`Buscar naturaleza por nombre/ID`}
							data={data.naturalezas}
							extract={(naturaleza) => `${naturaleza.id} ${naturaleza.nombre}`}
							on:select={({ detail }) => {
								$equipo.integrantes[index].id_naturaleza = detail.original.id;
								$equipo.integrantes[index].nombre_naturaleza = detail.original.nombre;
							}}
							bind:value={$equipo.integrantes[index].nombre_naturaleza}
						/>
					{/if}
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
					<p class="sum-container">
						Suma de EVs: {$equipo.integrantes[index].evs.vida +
							$equipo.integrantes[index].evs.ataque +
							$equipo.integrantes[index].evs.defensa +
							$equipo.integrantes[index].evs.ataque_especial +
							$equipo.integrantes[index].evs.defensa_especial +
							$equipo.integrantes[index].evs.velocidad} / 510
					</p>
					<button type="button" on:click={() => quitarIntegrante(index)}>
						Quitar Integrante
					</button>
				</fieldset>
			{/each}
		</div>
		{#if $equipo.integrantes.length < 6}
			<button type="button" on:click={agregarIntegrante}> Agregar Integrante </button>
		{/if}
		{#if $equipo.integrantes.length >= 1}
			<button type="submit" disabled={!validarDatos()}> Confirmar </button>
		{/if}
	</form>
</main>
