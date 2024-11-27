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




<div class="movimiento-header">
  <h2 class="movimiento">Movimientos</h2>
</div>
  <div class="informacion-tabla-movimientos">
    <div class="tabla-movimientos">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Fuerza</th>
            <th>Precisión</th>
          </tr>
        </thead>
        <tbody>
          {#each data.pokemon.movimientos as movimiento}
            <tr>
              <td>{movimiento.nombre}</td>
              <td>
                <span class="pokemon-tipo {movimiento.nombre.toLowerCase()}">{movimiento.nombre}</span>
              </td>
              {#if movimiento.potencia === null}
                <td>-</td>
              {:else}
                <td>{movimiento.potencia}</td>
              {/if}
              {#if movimiento.precision === null}
                <td>-</td>
              {:else}
                <td>{movimiento.precision}</td>
              {/if}
            </tr>
          {/each}
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
  background-color: #0080ff;
}

.pokemon-tipo.siniestro {
  background-color: #573e31;
}

.pokemon-tipo.normal {
  background-color: #797964;
}

.pokemon-tipo.planta {
  background-color: #5cb737;
}

.pokemon-tipo.fuego {
  background-color: #d52100;
}

.pokemon-tipo.agua {
  background-color: #6890F0;
}

.pokemon-tipo.eléctrico {
  background-color: #c90;
}

.pokemon-tipo.hielo {
  background-color: #0af;
}

.pokemon-tipo.lucha {
  background-color: #a84d3d;
}

.pokemon-tipo.veneno {
  background-color: #88447a;
}

.pokemon-tipo.tierra {
  background-color: #bf9926;
}

.pokemon-tipo.volador {
  background-color: #556dff;
}

.pokemon-tipo.psíquico {
  background-color: #ff227a;
}

.pokemon-tipo.bicho {
  background-color: #83901a;
}

.pokemon-tipo.roca {
  background-color: #a59249;
}

.pokemon-tipo.fantasma {
  background-color: #5454b3;
}

.pokemon-tipo.dragón {
  background-color: #4e38e9;
}

.pokemon-tipo.acero {
  background-color: #8e8ea4;
}

.pokemon-tipo.hada {
  background-color: #e76de7;
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

.movimiento-header {
  font-size: 0.8rem;
  display: inline-block;
  padding: 4px 6px;  
  margin-right: 2px;
  margin-bottom: 2px; 
  border-radius: 20px;
  border: 2px solid #333;  
  background-color: #333;
}
.movimiento {
  text-transform: capitalize;
  color: #f4f4f4;
}

.informacion-tabla-movimientos {
  text-align: center; 
  padding: 10px; 
  background-color: #f4f4f4;
  
}


.informacion-tabla-movimientos th {
  padding: 10px;
  text-align: center;
}

.informacion-tabla-movimientos td {
  padding: 10px;
  text-align: center;
}

.informacion-tabla-movimientos table {
  background-color: #e7e7f1;
  width: 100%;
  border-collapse: collapse;
}
</style>