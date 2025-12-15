import { useId } from "react"

function JobsSearchSection( { onTextFilter, onSearch } ) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperience = useId()

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const filters = {
      search: formData.get(idText),
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experience: formData.get(idExperience),
    }
    onSearch(filters)
  }

  const handleTextChange = (event) => {
    const text = event.target.value
    onTextFilter(text)
  }

  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form onSubmit={handleSubmit} role="search">
        <div className="search-input">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>

          <input
            name={idText}
            id="jobs-search-input"
            type="text"
            placeholder="Buscar empleos por título, tecnología o empresa"
            onChange={handleTextChange}
          />

          <button type="submit">Buscar</button>
        </div>

        <div className="search-filters">
          <select name={idTechnology} id="filter-technology">
            <option value="">Tecnología</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="react">React</option>
            <option value="node">Node.js</option>
          </select>

          <select name={idLocation} id="filter-location">
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="buenos-aires">Buenos Aires</option>
            <option value="santiago">Santiago</option>
            <option value="madrid">Madrid</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select name={idExperience} id="filter-experience">
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <p id="message"></p>
      </form>
    </section>
  )
}

export default JobsSearchSection