import { useState } from 'react'
import JobCard from './JobCard.jsx'
import Pagination from './Pagination.jsx'

const RESULTS_PER_PAGE = 4

function SearchResultsSection({ jobs }) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE)

  const pageResults = jobs.slice(
    (currentPage - 1) * RESULTS_PER_PAGE, // Página 1: 0-4, Página 2: 5-9 Página 3: 10-14
    currentPage * RESULTS_PER_PAGE // Página 1: 5, Página 2: 10 Página 3: 15
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  return (
    <section>
      <h3>Resultados de búsqueda</h3>
      <div className="job-listings">
        {pageResults.map((job) => (
          <JobCard
            key={job.id}
            job={job}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </section>
  )
}

export default SearchResultsSection