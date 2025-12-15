import { useState } from "react"
import JobsSearchSection from "../components/JobsSearchSection.jsx"
import jobsData from '../../data.json'
import SearchResultsSection from "../components/SearchResultsSection.jsx"

export function SearchPage() {
  const [textToFilter, setTextToFilter] = useState('')
  const [filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
  }

  const filteredJobs = jobsData.filter(job => {
    // Text filter
    if (textToFilter &&
        !job.titulo.toLowerCase().includes(textToFilter.toLowerCase()) &&
        !job.empresa.toLowerCase().includes(textToFilter.toLowerCase()) &&
        !job.descripcion.toLowerCase().includes(textToFilter.toLowerCase())) {
      return false
    }
    // Technology filter
    if (filters.technology) {
      const tech = Array.isArray(job.data.technology) ? job.data.technology : [job.data.technology]
      if (!tech.includes(filters.technology)) return false
    }
    // Location filter
    if (filters.location && job.data.location !== filters.location) return false
    // Experience filter
    if (filters.experience && job.data.experience !== filters.experience)   return false
    return true
  })

  return (
    <>
      <main className="jobs">
        <JobsSearchSection onSearch={handleSearch} onTextFilter={handleTextFilter} />
        <SearchResultsSection jobs={filteredJobs} currentPage={currentPage} onPageChange={setCurrentPage} />
      </main>
    </>
  )
}

export default SearchPage
