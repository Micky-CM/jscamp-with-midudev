
function App() {

  return (
    <>
  <header>
    <a href="index.html">
      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
      DevJobs
    </a>

    <nav>
      <a href="#">Buscar</a>
      <a href="jobs.html">Empleos</a>
      <a href="#">Empresas</a>
      <a href="#">Salarios</a>
    </nav>

  </header>

  <main className="jobs">
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form role="search">
        <div className="search-input">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>

          <input id="jobs-search-input" required type="text" placeholder="Buscar trabajos, empresas o habilidades" />
        </div>

        <div className="search-filters">
          <select name="technology" id="filter-technology">
            <option value="">Tecnología</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="react">React</option>
            <option value="node">Node.js</option>
          </select>

          <select name="location" id="filter-location">
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="buenos-aires">Buenos Aires</option>
            <option value="santiago">Santiago</option>
            <option value="madrid">Madrid</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select name="experience" id="filter-experience">
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <p id="message"></p>
      </form>
    </section>

    <section>
      <h3>Resultados de búsqueda</h3>
      <div className="job-listings">

      </div>

      <nav className="pagination">
        <a href="#">&lt;</a>
        <a className="is-active" href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">&gt;</a>
      </nav>
    </section>
  </main>

  <footer>
    <small>&copy; 2024 DevJobs. Todos los derechos reservados.</small>
  </footer>
    </>
  )
}

export default App
