import os from 'node:os'
import ms from 'ms'

console.log('Información del sistema operativo:')

console.log('Tipo de SO:', os.type())
console.log('Plataforma:', os.platform())
console.log('Arquitectura:', os.arch())
console.log('Número de CPUs:', os.cpus().length)
console.log('Memoria total (GB):', (os.totalmem() / 1024 / 1024 / 1024).toFixed(2))
console.log('Memoria libre (GB):', (os.freemem() / 1024 / 1024 / 1024).toFixed(2))
console.log('Tiempo de actividad:', ms(os.uptime() * 1000, { long: true }))
console.log('Interfaces de red:', os.networkInterfaces())
console.log('------------------------')

