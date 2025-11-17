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

const filterSelect = document.querySelector('#filter-tech')

filterSelect?.addEventListener('change', (event) => {
  console.log(event.target.value)
})