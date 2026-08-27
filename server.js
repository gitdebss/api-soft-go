import fastify from 'fastify'
import { DatabaseMemory } from './database-postgres.js';

const server = fastify()

const database = new DatabaseMemory()

server.post('/rides', async (request,reply) =>{
    const {
        date,
        hour,
        city,
        name,
        phone,
    } = request.body

    await database.create({
        date,
        hour,
        city,
        name,
        phone,
    })

    return reply.status(201).send('deu certo!')
})

server.get('/rides', async (request) => {
    const search = request.query.search

    return await database.list(search);
})

server.put('/rides/:id', async (request, reply) => {
    const rideId = request.params.id

    const {
        date,
        hour,
        city,
        name,
        phone,
    } = request.body

    await database.update(rideId, {
        date,
        hour,
        city,
        name,
        phone,
    })

    return reply.status(204).send()
})

server.delete('/rides/:id', async (request, reply) => {
    const rideId = request.params.id

    await database.delete(rideId)

    return reply.status(204).send()
})

server.listen({
    port: 3000,
})
