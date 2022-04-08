import Fastify from 'fastify'
import videoStreaming from './videoStreaming'
import SearchWord from './searchWord'
const fastify = Fastify({
  logger: true
})

const fs = require('fs')
const { Readable } = require('stream')

fastify.register(require('fastify-formbody'))
fastify.register(require('fastify-cors'), null)

// Declare a route
fastify.get('/video', videoStreaming)

fastify.get('/api/fetch_directory', (req, reply) => {
  fs.readdir(req.query.path, (err, paths) => {
    if (err) return reply.send('Something went wrong!')    
    reply.send(JSON.stringify(paths))
  })
})

fastify.get('/api/load_file', (req, reply) => {
  const buffer = fs.readFileSync(req.query.path)
  const stream = new Readable({
    read () {
      this.push(buffer)
      this.push(null)
    }
  })

  reply.type('text/plain')
  reply.send(stream)
})

fastify.get('/api/search_word', SearchWord)

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
