import express from 'express'
import jobs from './jobs.json' with { type: 'json' }
import { DEFAULT } from './config.js'

const PORT = process.env.PORT || DEFAULT.PORT
const app = express()

app.use((req, res, next) => {
  const timeString = new Date().toLocaleTimeString()
  console.log(`${timeString} - ${req.method} ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.send('<h1>Hola desde Express.js 🦖</h1>')
})

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
    uptime: process.uptime(),
  })
})

app.get('/jobs', async(req, res) => {
  // Para peticiones a la base de datos
  // const { default: jobs } = await import('./jobs.js', { with: { type: 'json' } })
  const { text, level, location, technology, limit = DEFAULT.LIMIT_PAGINATION, offset = DEFAULT.LIMIT_OFFSET } = req.query

  let filteredJobs = jobs

  if (text) {
    const searchTerm = text.toLowerCase()
    filteredJobs = filteredJobs.filter(job => {
      return job.titulo.toLowerCase().includes(searchTerm) ||
        job.descripcion.toLowerCase().includes(searchTerm)
    })
  }

  if (technology) {
    filteredJobs = filteredJobs.filter(job => job.data.technology.toLowerCase().includes(technology))
  }

  if (level) {
    filteredJobs = filteredJobs.filter(job => job.data.nivel.toLowerCase() === level.toLowerCase())
  }

  if (location) {
    filteredJobs = filteredJobs.filter(job => job.ubicacion.toLowerCase() === location.toLowerCase())
  }

  const limitNumber = Number(limit)
  const offsetNumber = Number(offset)

  const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)

  return res.json(paginatedJobs)
})

app.get('/job/:id', (req, res) => {
  const { id } = req.params

  return res.json(jobs.find(job => job.id === id))
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})