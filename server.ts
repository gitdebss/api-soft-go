import fastify from 'fastify'
import cors from '@fastify/cors'

import { DatabasePostgres } from './database-postgres.ts'
import type { RequestRide } from './models/interfaceRequestRide.ts'
import type { SearchRideQuery } from './models/interfaceSearchRide.ts'

const server = fastify()

// necessário pra conectar o front e o back
await server.register(cors, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

const database = new DatabasePostgres()

server.post<{ Body: RequestRide }>('/rides', async (request, reply) => {

    await database.create(request.body)

    return reply.status(201).send('deu certo!')
})

server.get<{ Querystring: SearchRideQuery }>('/rides', async (request) => {

    const search = request.query.search

    return database.list(search)
})

server.put<{ Params : RideParams, Body: RequestRide }>('/rides/:id', async (request, reply) => {

    const rideId = request.params.id

    await database.update(rideId, request.body)

    return reply.status(204).send()
})

server.delete<{ Params : RideParams}>('/rides/:id', async (request, reply) => {

    const rideId = request.params.id

    await database.delete(rideId)

    return reply.status(204).send()
})

server.listen({
    port: 3000,
})