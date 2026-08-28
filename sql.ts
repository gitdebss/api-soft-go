import 'dotenv/config'
import http, { IncomingMessage, ServerResponse } from 'http'
import { env } from 'process'
import { neon } from '@neondatabase/serverless'

export const sql = neon(env.DATABASE_URL!)

const requestHandler = async (req : IncomingMessage, res: ServerResponse) => {
  const result = await sql`SELECT version()`
  const { version } = result[0]

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(version)
}

http.createServer(requestHandler).listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
