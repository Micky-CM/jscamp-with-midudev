import express from 'express'
import jobs from './jobs.json' with { type: 'json' }

const PORT = process.env.PORT || 1234
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
  return res.json(jobs)
})

app.get('/job/:id', (req, res) => {
  const { id } = req.params

  return res.json(jobs.find(job => job.id === id))
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})