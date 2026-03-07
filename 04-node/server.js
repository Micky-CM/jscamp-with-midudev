import { createServer } from 'node:http'

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

const server = createServer((req, res) => {

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    return res.end('Hola desde Node.js 🦖')
  }

  if (req.url === '/users') {
    return sendJson(res, 200, [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ])
  }

  return sendJson(res, 404, { error: 'Not found' })
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

// Para ejecutar los cambios en tiempo real, puedes usar el siguiente comando en la terminal:
// node --watch server.js