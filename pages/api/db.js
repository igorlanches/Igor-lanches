import { Pool } from 'pg'
let pool
if(!global.pgPool){
  global.pgPool = new Pool({ connectionString: process.env.DATABASE_URL })
}
pool = global.pgPool
export default pool
