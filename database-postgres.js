import { randomUUID } from "node:crypto"
import { sql } from './sql.js'

export class DatabaseMemory {

    async list(search) {
        if (search) 
            return sql`select * from ride where title ilike ${'%' + search + '%'}` 
            
        else 
            return sql`select * from ride` 

    }

    async create(ride) {
        const rideId = randomUUID()
        const {
            date,
            hour,
            city,
            name,
            phone,
        } = ride

        await sql`insert into ride (id, date, hour, city, name, phone) VALUES (${rideId}, ${date}, ${hour}, ${city}, , ${name}, ${phone})`
    }

    async update(id, ride) {
        const {
            date,
            hour,
            city,
            name,
            phone,
        } = ride

        await sql`
            update ride set 
            date = ${date}, 
            hour = ${hour}, 
            city = ${city},
            name = ${name}, 
            phone = ${phone}, 
            where id = ${id}`
    }

    async delete(id) {
        await sql`delete from ride where id = ${id}`
    }
}