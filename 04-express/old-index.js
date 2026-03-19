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

// Arquitectura RESTful API
// GET /jobs -> Obtener un recurso o una colección de recursos
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

// GET /job/:id -> Obtener un recurso específico por su ID
app.get('/job/:id', (req, res) => {
  const { id } = req.params

  return res.json(jobs.find(job => job.id === id))
})

// POST /job -> Crear un nuevo recurso
app.post('/job', (req, res) => {
  // Lógica para crear un nuevo recurso
  return res.json({ message: 'Recurso creado' })
})

// PUT /job/:id -> Reemplazar un recurso completo por su ID
app.put('/job/:id', (req, res) => {
  // Lógica para reemplazar un recurso existente
  return res.json({ message: 'Recurso reemplazado' })
})

// PATCH /job/:id -> Actualizar parcialmente un recurso específico por su ID
app.patch('/job/:id', (req, res) => {
  // Lógica para actualizar parcialmente un recurso existente
  return res.json({ message: 'Recurso actualizado parcialmente' })
})

// DELETE /job/:id -> Eliminar un recurso específico por su ID
app.delete('/job/:id', (req, res) => {
  // Lógica para eliminar un recurso existente
  return res.json({ message: 'Recurso eliminado' })
})

// Otras formas de definir rutas
// Opcional -> /acd o /abcd
app.get('/a{b}cd', (req, res) => {
  return res.send('abcd o acd')
})

// Comodín
app.get('/bb*bb', (req, res) => {
  return res.send('bb*bb')
})

// Rutas más largas que no sabes como terminan
app.get('/file/*filename', (req, res) => {
  return res.send('file/*')
})

// Usar Regex
app.get(/.*fly$/, (req, res) => {
  return res.send('Terminando en fly')
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})