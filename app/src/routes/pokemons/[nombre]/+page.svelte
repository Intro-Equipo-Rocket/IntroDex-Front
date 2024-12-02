<script>
  export let data;
  
  let total_stats = data.pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
  let metodoMaquina = "Máquina";
  let metodoHuevo = "Huevo";

  const imagenesCategorias = {
    "físico": "https://img.pokemondb.net/images/icons/move-physical.png",
    "especial": "https://img.pokemondb.net/images/icons/move-special.png",
    "estado": "https://img.pokemondb.net/images/icons/move-status.png",
  };

  function obtenerImagenCategoria(categoria) {
    return imagenesCategorias[categoria.toLowerCase()] || "https://img.pokemondb.net/images/icons/move-status.png";
  }
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

{#if data.pokemon.evoluciones[0]}
  <h2>Evoluciones:</h2>
    <div class="pokemon-evoluciones">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {#each data.pokemon.evoluciones as evolucion}
            <tr>
              <td><a href="./{evolucion.pokemon.nombre}" style="text-decoration: underline">{evolucion.pokemon.nombre}</a></td>
              <td>
                <img src={evolucion.imagen_evolucion} alt={evolucion.pokemon.nombre} />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
{/if}

<h2 class="movimiento">Movimientos:</h2>
<div class="informacion-tabla-movimientos">
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Tipo</th>
        <th>Categoria</th>
        <th>Fuerza</th>
        <th>Precisión</th>
        <th>Metodo</th>
        <th>Nivel</th>
      </tr>
    </thead>
    <tbody>
      {#each data.pokemon.movimientos as movimiento}
        <tr>
          <td>{movimiento.movimientos.nombre}</td>
          <td>
            <span class="pokemon-tipo {movimiento.movimientos.class_tipo.nombre.toLowerCase()}">
              {movimiento.movimientos.class_tipo.nombre}
            </span>
          </td>
          <td>
            <img 
              src={obtenerImagenCategoria(movimiento.movimientos.class_categoria.nombre)} 
              alt={movimiento.movimientos.class_categoria.nombre} 
              class="imagen-categoria" 
              style="width: 30px; height: 30px; vertical-align: middle;"
            />
            {movimiento.movimientos.class_categoria.nombre}
          </td>
          {#if movimiento.movimientos.potencia == null}
            <td>-</td>
          {:else}
            <td>{movimiento.movimientos.potencia}</td>
          {/if}
          {#if movimiento.movimientos.precision == null}
            <td>-</td>
          {:else}
            <td>{movimiento.movimientos.precision}</td>
          {/if}
          <td>{movimiento.metodo.nombre}</td>
          {#if movimiento.metodo.nombre == metodoMaquina || movimiento.metodo.nombre == metodoHuevo}
            <td>-</td>
          {:else}
            <td>{movimiento.nivel}</td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
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

.pokemon-evoluciones {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-transform: capitalize;
}

.pokemon-evoluciones table {
  width: 50%;
  border-collapse: collapse;
}

.pokemon-evoluciones th {
  text-align: center;
  color: #333;
  font-weight: bold;
  padding-inline: 10px;
  background-color: #c0c3c7;
}

.pokemon-evoluciones td {
  padding: 10px;
  text-align: center;
  font-size: 1.5rem;
  border-bottom: 1px solid #b8adad;
  color : #555;
  background-color: white;
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
  background: #fff;
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
  background: #fff;
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

.informacion-tabla-movimientos {
  max-width: 85%;
  margin: 0 auto; 
  padding: 20px; 
  overflow-x: auto;
  
}

.informacion-tabla-movimientos th {
  padding: 10px;
  text-align: center;
  color : #333;
  font-size: 2rem;
  border: 1px solid #b8adad;
  background-color: #c0c3c7;
}

.informacion-tabla-movimientos td {
  padding: 10px;
  text-align: center;
  font-size: 1.5rem;
  border-bottom: 1px solid #b8adad;
  color : #555;
}

.informacion-tabla-movimientos table {
  background-color: #e7e7f1;
  width: 100%;
  border-collapse: collapse;
}
</style>