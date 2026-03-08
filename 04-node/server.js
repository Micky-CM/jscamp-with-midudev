import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'
import { json } from 'node:stream/consumers'

process.loadEnvFile() // Carga las variables de entorno desde el archivo .env

// Puedes configurar el puerto a través de una variable de entorno o usar el puerto 3000 por defecto
const port = process.env.PORT ?? 3000
// Para cambiar el puerto, puedes ejecutar el siguiente comando en la terminal:
// PORT=1234 node server.js

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Midu' }
]

const server = createServer(async (req, res) => {
  const { method, url } = req
  const [pathname, querystring] = url.split('?')

  const searchParams = new URLSearchParams(querystring)

  if (method === 'GET') {
    if (url === '/') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      return res.end('Hola desde Node.js 🦖')
    }

    if (pathname === '/users') {
      const limit = Number(searchParams.get('limit')) || users.length
      const offset = Number(searchParams.get('offset')) || 0

      const paginatedUsers = users.slice(offset, offset + limit)

      return sendJson(res, 200, paginatedUsers)
    }

    if (url === '/health') {
      return sendJson(res, 200, { status: 'OK', uptime: process.uptime() })
    }
  }

  if (method === 'POST') {
    if (url === '/users') {
      const body = await json(req)

      if (!body || !body.name) {
        return sendJson(res, 400, { error: 'Name is required' })
      }

      const newUser = {
        id: randomUUID(),
        name: body.name
      }

      users.push(newUser)

      return sendJson(res, 201, { message: 'User created'})
    }
  }

  return sendJson(res, 404, { error: 'Not found' })
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

// Para ejecutar los cambios en tiempo real, puedes usar el siguiente comando en la terminal:
// node --watch server.js