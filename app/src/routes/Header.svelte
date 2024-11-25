<header>
    <nav>
        <a class=nav-button href="/">Menú de inicio</a>
        <a class=nav-button href="/pokemons">Pokemons</a>
        <a class=nav-button href="/movimientos">Movimientos</a>
        <a class=nav-button href="/equipos">Equipos</a>
    </nav>
</header>

<style>

nav {
		display: flex;
		justify-content: space-around;
}
a {
    text-decoration: none;
}
h1 {
    color:#f0f0f0;
    font-family:"Fira Sans","Trebuchet MS",Ubuntu,Helvetica,Arial sans-serif;
    font-weight:bold;
    text-align: center;
}
    
.grid-container {
    margin: auto;
    max-width:1220px
}
.main-header {
    margin-top: -21px;
    height:80px;
    background-color:#202020;
}
.main-menu {
    margin-top:-24px;
    background-color:#363636;
    background-image:linear-gradient(#404040, #363636)
}
.main-menu-list {
    position:relative;
    display:flex;
    flex-wrap:wrap;
    margin:0
}
.main-menu-list li {
    list-style:none
}
.main-menu-item {
    flex:1 0;
    color:#f0f0f0;
    text-shadow:1px 1px 2px rgba(0,0,0,.7)
}
.main-menu-item a {
    color:#f0f0f0;
    text-decoration:none
}
.main-menu-heading {
    display:flex;
    flex-direction:column;
    align-items:center;
    height:100%;
    padding:.25rem .5rem 0;
    font-size:.75rem;
    text-align:center
}
.main-menu-icon {
    width:24px;
    height:24px;
    margin:0 0 .25rem
}
  
</style>