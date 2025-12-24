import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import JobsSearchSection from "../components/JobsSearchSection.jsx"
import SearchResultsSection from "../components/SearchResultsSection.jsx"

const RESULTS_PER_PAGE = 4

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState(() => {
    return {
      technology: searchParams.get('technology') || '',
      location: searchParams.get('type') || '',
      experience: searchParams.get('level') || ''
    }
  })
  const [textToFilter, setTextToFilter] = useState(() => searchParams.get('text') || '')

  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get('page'))
    return Number.isNaN(page) ? page : 1
  })

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const handleClearFilters = () => {
    setFilters({
      technology: '',
      location: '',
      experience: ''
    })
    setTextToFilter('')
    setCurrentPage(1)
  }

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

  useEffect(() => {
    setSearchParams((params) => {
      if (textToFilter) params.set('text', textToFilter)
      if (filters.technology) params.set('technology', filters.technology)
      if (filters.location) params.set('type', filters.location)
      if (filters.experience) params.set('level', filters.experience)
      if (currentPage > 1) params.set('page', currentPage)

      return params
    })
  }, [filters, textToFilter, currentPage, setSearchParams])

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
    textToFilter,
    handleTextFilter,
    handleClearFilters,
    currentPage,
    setCurrentPage
  }
}

export default function SearchPage() {
  const {
    loading,
    jobs,
    total,
    totalPages,
    textToFilter,
    currentPage,
    setCurrentPage,
    handleSearch,
    handleTextFilter,
    handleClearFilters
  } = useFilters()

  const title = loading
    ? `Cargando...`
    : `Resultados: ${total}, Página ${currentPage} - DevJobs`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content="Explora miles de oportunidades laborales en el sector tecnológico. Encuentra tu próximo empleo en DevJobs." />
      <main className="jobs">
        <JobsSearchSection
          initialText={textToFilter}
          onSearch={handleSearch}
          onTextFilter={handleTextFilter}
          handleClearFilters={handleClearFilters}
        />
        <h2>Resultados de búsqueda</h2>
        {
          loading
            ? <p>Cargando empleos...</p>
            : <SearchResultsSection jobs={jobs} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        }
      </main>
    </>
  )
}
