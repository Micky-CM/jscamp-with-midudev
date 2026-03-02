import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, basename, extname } from 'node:path'

let content = ''

if (process.permission.has('fs.read', 'archivo.txt')) {
  content = await readFile('archivo.txt', 'utf-8')
  console.log(content)
} else {
  console.log('No tienes permiso para leer el archivo.')
}

if (process.permission.has('fs.write', 'output/files/documents')) {
const outputDir = join('output', 'files', 'documents')
await mkdir(outputDir, { recursive: true })

const uppercaseContent = content.toUpperCase()
const outputFilePath = join(outputDir, 'archivo-uppercase.txt')

console.log('La extensión es: ', extname(outputFilePath)) // .txt
console.log('El nombre del archivo es: ', basename(outputFilePath)) //archivo-uppercase.txt

await writeFile(outputFilePath, uppercaseContent)
console.log('Archivo creado con contenido en mayúsculas')
} else {
  console.log('No tienes permiso para escribir en el directorio especificado.')
}

// Para dar permisos a un archivo o directorio, puedes usar el siguiente comando en la terminal:
// node --allow-fs-read=archivo.txt --allow-fs-write=output/* manage-files.js