import { useState } from 'react'
import { Link } from './Link'
import styles from './JobCard.module.css'

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
        <h3>
          <Link href={`/jobs/${job.id}`} className={styles.title}>
            {job.titulo}
          </Link>
        </h3>
        <small>{job.empresa} | {job.ubicacion}</small>
        <p>{job.descripcion}</p>
      </div>

      <div className={styles.actions}>
        <Link href={`/jobs/${job.id}`} className={styles.details}>
          Ver detalles
        </Link>
        <button
          className={`btn-apply-job ${buttonClass}`}
          disabled={isApplied}
          onClick={handleClick}
        >
          {textButton}
        </button>
      </div>
    </article>
  )
}

export default JobCard