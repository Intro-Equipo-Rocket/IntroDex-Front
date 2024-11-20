export async function load() {
   let url = new URL('http://127.0.0.1:8000/pokemons/')
   const response = await fetch(url);
   if (!response.ok) {
       throw new Error(`Response status: ${response.status}`);
   }

   let pokemons = await response.json();

   return {
       pokemons: pokemons
   };
}
