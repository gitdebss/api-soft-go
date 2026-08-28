import { sql } from './sql.ts'

import type { RequestRide } from "./models/interfaceRequestRide.ts"

export class DatabasePostgres {

    async list(search?: string) {
        if (search) 
            return sql`select * from ride where title ilike ${'%' + search + '%'}` 
            
        else 
            return sql`select * from ride` 

    }

    async create(ride : RequestRide) {
        await sql`insert into ride (date, hour, city, name, phone) VALUES (${ride.date}, ${ride.hour}, ${ride.city}, ${ride.name}, ${ride.phone})`
    }

    async update(id: number, ride: RequestRide) {
        await sql`
            update ride set 
            date = ${ride.date}, 
            hour = ${ride.hour}, 
            city = ${ride.city},
            name = ${ride.name}, 
            phone = ${ride.phone}
            where id = ${id}`
    }

    async delete(id: number) {
        await sql`delete from ride where id = ${id}`
    }
}