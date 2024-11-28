<script>
   export let data;
</script>

<h1>Lista de Pokemones</h1>

<div class="pokemon-lista">
    {#each data.pokemons as pokemon}    
    <a href={`/pokemons/${pokemon.nombre}`} class="pokemon-tarjeta">
        <img src="{pokemon.imagen}" alt="{pokemon.nombre}">
        <h3 class="pokemon-nombre">{pokemon.nombre}</h3>
        {#each pokemon.tipos as tipo}
        <span class="pokemon-tipo {tipo.nombre.toLowerCase()}">{tipo.nombre}</span>
        {/each}
    </a>
    {/each}
</div>

<style>

h1{
    text-align: center;
}

.pokemon-lista {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    padding: 20px;
}
.pokemon-tarjeta {
    background: #fff;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6);
    transition: transform 0.2s ease-in-out;
}
.pokemon-tarjeta:hover {
    transform: scale(1.05);
}
.pokemon-tarjeta img {
    max-width: 100px;
    margin-bottom: 10px;
}
.pokemon-nombre {
    margin: 5px 0;
    color: #333;
}

</style>