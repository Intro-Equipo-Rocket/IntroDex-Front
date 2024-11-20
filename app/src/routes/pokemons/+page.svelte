<script>
   export let data;
</script>

<h1>Pokemons</h1>

<table>
   <thead>
       <tr>
           <th>Nombre</th>
           <th>Imagen</th>
           <th>Altura</th>
           <th>Peso</th>
           <th>Generacion</th>
           <th>Tipos</th>
           <th>Habilidades</th>
           <th>Grupo Huevo</th>
           <th>Stats</th>
           <th>Imagen Evolución</th>
       </tr>
   </thead>
   <tbody>
       {#each data.pokemons as pokemon}
           <tr>
                <td>{pokemon.nombre}</td>
                <td><img src="{pokemon.imagen}" alt="{pokemon.nombre}"></td>
                <td>{pokemon.altura}</td>
                <td>{pokemon.peso}</td>
                {#each pokemon.tipos as tipo}
                    <td>{tipo.nombre}</td>
                {/each}
                {#each pokemon.habilidades as habilidad}
                    <td>{habilidad.nombre}</td>
                {/each}
                {#each pokemon.grupo_huevo as grupo_huevo}
                    <td>{grupo_huevo.nombre}</td>
                {/each}
                {#each pokemon.stats as stat}
                    <td>valor: {stat.base_stat}</td>
                {/each}
                <td><img src="{pokemon.imagen_evolucion}" alt="{""}"></td>
           </tr>
       {/each}
   </tbody>
</table>