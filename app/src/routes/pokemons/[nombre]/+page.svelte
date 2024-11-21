<script>
  export let data;
</script>

{#if data.pokemon}

<div class="pokemon-header">
  <h1 class="pokemon-nombre">{data.pokemon.nombre}</h1>
</div>

<div class="pokemon-pagina">
  <div class="pokemon-detalles">
    <div class="pokemon-info">
      <div class="contenedor-imagen">
        <img src="{data.pokemon.imagen}" alt="{data.pokemon.nombre}" class="pokemon-imagen"/>
      </div>
      <table>
        <tbody>
          <tr>
            <th><h1>Pokedex</h1></th>
            <td><h1>Data</h1></td>
          </tr>
          <tr>
            <th>Tipos</th>
            <td>
              {#each data.pokemon.tipos as tipo}
                <span class="pokemon-tipo {tipo.nombre.toLowerCase()}">{tipo.nombre}</span>
              {/each}
            </td>
          </tr>
          <tr>
            <th>Generacion</th>
            <td>{data.pokemon.generacion}</td>
          </tr>
          <tr>
            <th>Altura</th>
            <td>{data.pokemon.altura} m</td>
          </tr>
          <tr>
            <th>Peso</th>
            <td>{data.pokemon.peso} kg</td>
          </tr>
          <tr>
            <th>Habilidades</th>
            <td>
              {#each data.pokemon.habilidades as habilidad}
                <p>{habilidad.nombre}</p>
              {/each}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

{:else}
  <p>Cargando datos del Pokémon...</p>
{/if}

<style>

.pokemon-pagina {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.pokemon-detalles {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  background: #fff;
  padding: 20px;
}

.pokemon-header {
  text-align: center;
}

.contenedor-imagen {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px; 
  height: 150px;
  background-color: #f4f4f4; 
}

.pokemon-imagen {
  max-width: 100%;
  height: auto;
}

.pokemon-nombre {
  font-size: 2rem;
  color: #333;
  text-transform: capitalize;
}

.pokemon-info {
  display: flex;
  justify-content: center;
  align-items: center; 
  position: relative; 
  height: 300px; 
  width: 400px; 
  background-color: #f4f4f4; 
}

.pokemon-info table {
  width: 100%;
  border-collapse: collapse;
}

.pokemon-info th {
  text-align: left;
  color: #555;
  font-weight: bold;
}

.pokemon-info td {
  padding: 5px;
  color: #333;
}

.pokemon-tipo {
  display: inline-block;
  padding: 6px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 20px;
  color: #fff;
  text-transform: capitalize;
}

.pokemon-tipo.agua {
  background-color: #6390f0;
}

.pokemon-tipo.siniestro {
  background-color: #705848;
}

.pokemon-tipo.normal {
  background-color: #A8A878;
}

.pokemon-tipo.planta {
  background-color: #78C850;
}

.pokemon-tipo.fuego {
  background-color: #F08030;
}

.pokemon-tipo.agua {
  background-color: #6890F0;
}

.pokemon-tipo.eléctrico {
  background-color: #F8D030;
}

.pokemon-tipo.hielo {
  background-color: #98D8D8;
}

.pokemon-tipo.lucha {
  background-color: #C03028;
}

.pokemon-tipo.veneno {
  background-color: #A040A0;
}

.pokemon-tipo.tierra {
  background-color: #E0C068;
}

.pokemon-tipo.volador {
  background-color: #A890F0;
}

.pokemon-tipo.psíquico {
  background-color: #F85888;
}

.pokemon-tipo.bicho {
  background-color: #A8B820;
}

.pokemon-tipo.roca {
  background-color: #B8A038;
}

.pokemon-tipo.fantasma {
  background-color: #705898;
}

.pokemon-tipo.dragón {
  background-color: #7038F8;
}

.pokemon-tipo.acero {
  background-color: #B8B8D0;
}

.pokemon-tipo.hada {
  background-color: #EE99AC;
}

</style>