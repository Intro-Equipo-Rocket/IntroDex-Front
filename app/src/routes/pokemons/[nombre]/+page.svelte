<script>
  export let data;
</script>

{#if data.pokemon}
  <main>
    <h1>{data.pokemon.nombre}</h1>
    <img src="{data.pokemon.imagen}" alt="{data.pokemon.nombre}" />
    <p><strong>Altura:</strong> {data.pokemon.altura}</p>
    <p><strong>Peso:</strong> {data.pokemon.peso}</p>
    <p><strong>Generación:</strong> {data.pokemon.generacion}</p>
    <section>
      <h2>Tipos</h2>
      <ul>
        {#each data.pokemon.tipos as tipo}
          <li>{tipo.nombre}</li>
        {/each}
      </ul>
    </section>
  </main>
{:else}
  <p>Cargando datos del Pokémon...</p>
{/if}