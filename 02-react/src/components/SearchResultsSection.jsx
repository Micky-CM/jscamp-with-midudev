import JobCard from './JobCard'

function SearchResultsSection() {
  return (
    <section>
      <h3>Resultados de búsqueda</h3>
      <div className="job-listings">
        <JobCard
          titulo="Desarrollador Frontend"
          empresa="Tech Solutions"
          ubicacion="Remoto"
          descripcion="Buscamos un desarrollador frontend con experiencia en React.js y CSS."
          data={{ location: 'remoto', technology: 'react', experiencia: 'junior' }}
        />
        <JobCard
          titulo="Backend Developer"
          empresa="Innovatech"
          ubicacion="Buenos Aires"
          descripcion="Se necesita un desarrollador backend con conocimientos en Node.js y bases de datos SQL."
          data={{ location: 'buenos-aires', technology: 'node', experiencia: 'mid' }}
        />
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
  )
}

export default SearchResultsSection