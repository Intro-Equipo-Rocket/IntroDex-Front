<script>
  export let equipo; 
</script>

<main>
  <h1>Detalles del Equipo</h1>
  <table class="detalle-equipo">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Generación</th>
        <th>Integrantes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{equipo.id}</td>
        <td>{equipo.nombre}</td>
        <td>{equipo.generacion}</td>
        <td>
          <ul>
            {#each equipo.integrantes as integrante}
              <li>
                <img class="picon" src="{integrante.pokemon.imagen}" alt="{integrante.pokemon.nombre}" />
                {integrante.pokemon.nombre}
              </li>
            {/each}
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</main>

<style
.detalle-equipo {
  max-width: 85%;
  margin: 0 auto; 
  padding: 20px; 
  overflow-x: auto;
}

.detalle-equipo th {
  padding: 10px;
  text-align: center;
  color: #333;
  font-size: 2rem;
  border: 1px solid #b8adad;
  background-color: #c0c3c7;
}

.detalle-equipo td {
  padding: 10px;
  text-align: center;
  font-size: 1.5rem;
  border-bottom: 1px solid #b8adad;
  color: #555;
}

.detalle-equipo table {
  background-color: #e7e7f1;
  width: 100%;
  border-collapse: collapse;
}

.picon {
  width: 40px; 
  height: 40px;
  margin-right: 10px;
}
></style>