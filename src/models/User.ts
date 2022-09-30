import client from '../helpers/connection'
import '../helpers/functions';
import { passwordHash, passwordVerify } from '../helpers/functions';

export type User = {
    id: number
    first_name: string
    last_name: string
    username: string,
    password: string,
}

export class UserStore{

    async register(user: User): Promise<User> {
        try {
          const conn = await client.connect()
          const sql = 'INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *'
    
          const hash = await passwordHash(user.password)
    
          const result = await conn.query(sql, [user.first_name, user.last_name, user.username, hash])
          user = result.rows[0]
    
          conn.release()
    
          return user
        } catch(err) {
          throw new Error(`unable create user (${user.username}): ${err}`)
        } 
    } // end of create

    async login(username: string, password: string): Promise<User | null> {
      try{
        const conn = await client.connect()
        const sql = 'SELECT * FROM users WHERE username=($1)'

        const result = await conn.query(sql, [username])
        
        if(result.rows.length) {

            const user = result.rows[0]
            if (await passwordVerify(password, user.password)) {
              return user
            }
        }

        return null;
      } catch(err) {
        throw new Error("Something went wrong")
      }
    } // end of login
    
    async index(): Promise<User[]> {
      try{
        const conn = await client.connect()
        const stmt = await conn.query("SELECT id, first_name, last_name FROM users")
        conn.release()
        return stmt.rows
      } catch(err) { 
        throw new Error("Error: "+ err)
      }
    } // end of index

    async find(id: number): Promise<User> {
      try{
          const conn = await client.connect()
          const stmt = await conn.query("SELECT id, first_name, last_name FROM users WHERE id=$1", [
              id,
          ])
          conn.release()
          return stmt.rows[0]
      } catch(err) { 
          throw new Error("Error: "+ err)
      }
  } // end of find
  
}
