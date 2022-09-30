import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const { 
  APP_ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_DB_TEST,
} = process.env


const client = new Pool({
  host: POSTGRES_HOST,
  database: APP_ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: parseInt((POSTGRES_PORT ?? 5432).toString()),
})

export default client