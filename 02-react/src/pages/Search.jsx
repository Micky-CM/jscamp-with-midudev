import { useEffect, useState } from "react"
import JobsSearchSection from "../components/JobsSearchSection.jsx"
import SearchResultsSection from "../components/SearchResultsSection.jsx"

const RESULTS_PER_PAGE = 4

const useFilters = () => {
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experience: ''
  })
  const [textToFilter, setTextToFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)

        const params = new URLSearchParams()
        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.experience) params.append('level', filters.experience)

        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        params.append('limit', RESULTS_PER_PAGE)
        params.append('offset', offset)

        const queryParams = params.toString() ? `?${params.toString()}` : ''

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs${queryParams}`)
        const json = await response.json()

        setJobs(json.data)
        setTotal(json.total)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [filters, textToFilter, currentPage])

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

  const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
  }

  return {
    jobs,
    total,
    totalPages,
    loading,
    handleSearch,
    handleTextFilter,
    currentPage,
    setCurrentPage
  }
}
export function SearchPage() {
  const {
    loading,
    jobs,
    totalPages,
    currentPage,
    setCurrentPage,
    handleSearch,
    handleTextFilter,
  } = useFilters()

  return (
    <>
      <main className="jobs">
        <JobsSearchSection onSearch={handleSearch} onTextFilter={handleTextFilter} />
        {
          loading
            ? <p>Cargando empleos...</p>
            : <SearchResultsSection jobs={jobs} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        }
      </main>
    </>
  )
}

export default SearchPage
