<script>
  export let data;
  
  let total_stats = data.pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
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
          <tr>
            <th>Grupo Huevo</th>
            <td>
              {#each data.pokemon.grupo_huevo as grupo}
                <p>{grupo.nombre}</p>
              {/each}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pokemon-stats">
        <h2>Base stats</h2>
        <div>
          <table>
            {#each data.pokemon.stats as stat}
            <tbody>
              <tr>
                <th>{stat.stats.nombre}:</th>
                <td>{stat.base_stat}</td>
              </tr>
            </tbody>
            {/each}
            <tfoot>
              <tr>
                <th>Total</th>
                <td>{total_stats}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
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
  background-color: #f4f4f4; 
}

.pokemon-info table {
  width: 100%;
  border-collapse: collapse;
}

.pokemon-info th {
  text-align: end;
  color: #555;
  font-weight: bold;
  padding-inline: 10px;
}

.pokemon-info td {
  padding: 5px;
  color: #333;
}

.pokemon-info table {
  width: 100%;
  border-collapse: collapse;
}

.pokemon-info th {
  text-align: end;
  color: #555;
  font-weight: bold;
  padding-inline: 10px;
}

.pokemon-info td {
  padding: 10px;
  color: #333;
}

</style>