import JobCard from './JobCard.jsx'
import Pagination from './Pagination.jsx'

function SearchResultsSection({ jobs, currentPage, totalPages, onPageChange }) {
  return (
    <section>
      <h3>Resultados de búsqueda</h3>
      <div className="job-listings">
        {
          jobs.length === 0 && <p>No se han encontrado empleos que coincidan con los criterios de búsqueda.</p>
        }
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </section>
  )
}

export default SearchResultsSection