<script>
   import Header from './Header.svelte';
   import Footer from './Footer.svelte';
   import '../styles/global.css';

   let { children } = $props();
</script>

<div class="app">
   <Header />

   <main>
       {@render children()}
   </main>
  
   <Footer />
</div>