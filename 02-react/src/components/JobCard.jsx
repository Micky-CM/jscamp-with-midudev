import { useState } from 'react'

function JobCard({ data, titulo, empresa, ubicacion, descripcion }) {

  const [isApplied, setIsApplied] = useState(false)

  function handleClick() {
    setIsApplied(!isApplied)
  }

  const textButton = isApplied ? 'Aplicado' : 'Aplicar'
  const buttonClass = isApplied ? 'btn-apply-job' : ''

  return (
    <article
      className="job-description-card"
      data-job={data?.location}
      data-technology={data?.technology}
      data-experience={data?.experiencia}
    >
      <div>
        <h3>{titulo}</h3>
        <small>{empresa} | {ubicacion}</small>
        <p>{descripcion}</p>
      </div>
      <button
        className={`btn-apply-job ${buttonClass}`}
        disabled={isApplied}
        onClick={handleClick}
      >
        {textButton}
      </button>
    </article>
  )
}

export default JobCard