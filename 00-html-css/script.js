/* const buttonsApply = document.querySelectorAll('.btn-apply-job')

buttonsApply.forEach(button => {
  button.addEventListener('click', () => {
    button.textContent = '¡Aplicado!'
    button.disabled = true
  })
}) */

const jobListingSection = document.querySelector('.job-listings')

jobListingSection?.addEventListener('click', (event) => {
  const element = event.target;
  if (element.classList.contains('btn-apply-job')) {
    element.textContent = '¡Aplicado!';
    element.disabled = true;
  }
})

const filterTechnology = document.querySelector('#filter-technology')

filterTechnology?.addEventListener('change', (event) => {
  const selectedTech = event.target.value
  console.log(selectedTech)

  // Mostrar todos los trabajos si no hay una tecnología seleccionada
  if (!selectedTech) {
    document.querySelectorAll('.job-description').forEach(job => {
      job.style.display = 'block'
    })
    return
  }

  // Ocultar los trabajos que no coinciden con la tecnología seleccionada
  document.querySelectorAll('.job-description').forEach(job => {
    const jobTechnologies = job.getAttribute('data-technology').split(' ')

    if (jobTechnologies.includes(selectedTech)) {
      job.style.display = 'block'
    } else {
      job.style.display = 'none'
    }
  })
})

const filterLocation = document.querySelector('#filter-location')

filterLocation?.addEventListener('change', (event) => {
  const selectLocation = event.target.value
  console.log(selectLocation)

  // Mostrar todos los trabajos si no hay una ubicación seleccionada
  if (!selectLocation) {
    document.querySelectorAll('.job-description').forEach(job => {
      job.style.display = 'block'
    })
    return
  }

  // Ocultar los trabajos que no coinciden con la ubicación seleccionada
  document.querySelectorAll('.job-description').forEach(job => {
    const jobLocation = job.getAttribute('data-location')

    if (jobLocation === selectLocation) {
      job.style.display = 'block'
    } else {
      job.style.display = 'none'
    }
  })
})