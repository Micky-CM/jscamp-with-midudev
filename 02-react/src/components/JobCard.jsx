import { useState } from 'react'

function JobCard({ job }) {

  const [isApplied, setIsApplied] = useState(false)

  function handleClick() {
    setIsApplied(!isApplied)
  }

  const textButton = isApplied ? 'Aplicado' : 'Aplicar'
  const buttonClass = isApplied ? 'btn-apply-job' : ''

  return (
    <article
      className="job-description-card"
      data-job={job.data?.location}
      data-technology={job.data?.technology}
      data-experience={job.data?.experiencia}
    >
      <div>
        <h3>{job.titulo}</h3>
        <small>{job.empresa} | {job.ubicacion}</small>
        <p>{job.descripcion}</p>
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