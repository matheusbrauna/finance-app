import fastifyCors from '@fastify/cors'
import fastify from 'fastify'

const app = fastify()

app.register(fastifyCors)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})

app.get('/hello', (request, reply) => {
  reply.send({
    hello: 'world',
  })
})
