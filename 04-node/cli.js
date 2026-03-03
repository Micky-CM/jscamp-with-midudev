// console.log(process.argv)
/* Para crear argumentos personalizados, se pueden usar los siguientes comandos:
node cli.js --argument --otro-argumento
Para acceder a los argumentos personalizados, se puede usar el siguiente código: */
// const args = process.argv.slice(2)
// const nameArg = args.find(arg => args)


import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

// 1. Recuperar el directorio a listar
const dir = process.argv[2] ?? '.'

// 2. Formateo simple de tamaño de archivos
function formatSize(size) {
  if (size < 1024) return `${size} B`
  return `${(size / 1024).toFixed(2)} KB`
}

// 3. Leer los nombres, sin info
const files = await readdir(dir)
console.log(files)

// 4. Recuperar la info de cada directorio
const entries = await Promise.all(
  files.map(async name => {
    const fullPath = join(dir, name)
    const info = await stat(fullPath)

    return {
      name,
      isDir: info.isDirectory(),
      size: formatSize(info.size)
    }
  })
)

// 5. Renderizar la info
for (const entry of entries) {
  const icon = entry.isDir ? '📁' : '📄'
  const size = entry.isDir ? '-' : ` (${entry.size})`
  console.log(`${icon} ${entry.name.padEnd(20)} ${size}`)
}