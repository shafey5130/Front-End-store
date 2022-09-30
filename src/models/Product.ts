import client from '../helpers/connection'

export type Product = {
    id: number
    name: string
    price: string
    category: string|null,
    userid: number,
}

export class ProductStore{

    public async index(): Promise<Product[]> {
        try{
            const conn = await client.connect()
            const stmt = await conn.query("SELECT * FROM products")
            conn.release()
            return stmt.rows
        } catch(err) { 
            throw new Error("Error: "+ err)
        }
    } // end of index

    public async find(id: number): Promise<Product> {
        try{
            const conn = await client.connect()
            const stmt = await conn.query("SELECT * FROM products WHERE id=$1", [
                id,
            ])
            conn.release()
            return stmt.rows[0]
        } catch(err) { 
            throw new Error("Error: "+ err)
        }
    } // end of find
    
    public async create(Product: Product): Promise<Product> {
        try{
            const conn = await client.connect()
            const stmt = await conn.query("INSERT INTO products(name, price, category, userid) VALUES($1, $2, $3, $4) returning *", [
                Product.name, Product.price, Product.category ? Product.category : 'uncategory', Product.userid
            ])
            conn.release()
            return stmt.rows[0]
        } catch(err) {
            throw new Error("Error: "+ err)
        }
    } // end of create

    public async latest(num: number=5): Promise<Product[]> {
        try{
            const conn = await client.connect()
            const stmt = await conn.query("SELECT * FROM products ORDER BY id DESC LIMIT $1", [
                num,
            ])
            conn.release()
            return stmt.rows
        } catch(err) { 
            throw new Error("Error: "+ JSON.stringify(err))
        }
    } // end of latest

    public async byCategory(category: string='uncategory'): Promise<Product[]> {
        try{
            const conn = await client.connect()
            const stmt = await conn.query("SELECT * FROM products WHERE category=$1", [
                category,
            ])
            conn.release()
            return stmt.rows
        } catch(err) { 
            throw new Error("Error: "+ err)
        }
    } // end of latest
        
}
