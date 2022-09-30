import client from '../helpers/connection'

export type Order = {
    id: number
    userid: number,
    status: number|null
}

export type ProductOrder = {
    id: number,
    productid: number,
    quantity: number,
    orderid: number,
}

export enum orderStatus {
    dispatched = 1,
    canceled = 2,
    completed = 3,
    closed = 4,
}

export class OrderStore{

    public async index(): Promise<Order[]> {
        try{
            const conn = await client.connect()
            const stmt = await conn.query("SELECT * FROM orders")
            conn.release()
            return stmt.rows
        } catch(err) { 
            throw new Error("Error: "+ err)
        }
    } // end of index

    public async myOrders(userid: number): Promise<Order[]> {
        try{
            const conn = await client.connect()
            const stmt = await conn.query("SELECT * FROM orders WHERE userid=$1", [
                userid
            ])
            conn.release()
            return stmt.rows
        } catch(err) { 
            throw new Error("Error: "+ err)
        }
    } // end of myOrders

    public async myCarts(userid: number): Promise<Order[]> {
        try{
            const conn = await client.connect()
            const stmt = await conn.query("SELECT * FROM orders INNER JOIN products_order ON products_order.order_id = orders.id WHERE orders.userid = $1", [
                userid
            ])
            conn.release()
            return stmt.rows
        } catch(err) { 
            throw new Error("Error: "+ err)
        }
    } // end of myCarts
    
    public async create(Order: Order) {
        try{
            const conn = await client.connect()
            const stmt = await conn.query("INSERT INTO orders(status, userid) VALUES($1, $2) returning *", [
                Order.status, Order.userid
            ])
            conn.release()
            return stmt.rows[0]
        } catch(err) {
            throw new Error("Error: "+ err)
        }
    } // end of create
    
    public async updateStatus(status: number, orderid: number, userid: number): Promise<number> {
        try{
            const conn = await client.connect()
            const stmt = await conn.query("UPDATE orders SET status=$1 WHERE userid=$2 AND id=$3", [
                status, userid, orderid
            ])
            conn.release()
            return stmt.rowCount
        } catch(err) {
            throw new Error("Error: "+ err)
        }
    } // end of updateStatus

    public async addToCart(productOrder: ProductOrder, userid: number) {
        try{
            const conn = await client.connect()
            
            let stmt = await conn.query("SELECT * FROM orders WHERE id=$1 AND userid=$2", [
                productOrder.orderid, userid
            ])

            if(stmt.rows.length == 0) {
                return "invalid orderid";
            }

            stmt = await conn.query("SELECT * FROM orders INNER JOIN products_order on orders.id = products_order.order_id WHERE products_order.product_id=$1 AND products_order.order_id=$2", [
                productOrder.productid, productOrder.orderid
            ])

            if(stmt.rows.length > 0) {
                if(stmt.rows[0]['status'] == orderStatus.closed) {
                    return "order has been closed";
                }
                let quantity = parseInt(productOrder.quantity.toString())+stmt.rows[0]['quantity']
                quantity = quantity >= 0 ? quantity : 1;
                stmt = await conn.query("UPDATE products_order SET quantity = $3 WHERE product_id=$1 AND order_id=$2", [
                    productOrder.productid, productOrder.orderid, quantity
                ])
                return "quantity updated to "+quantity.toString()
            }

            stmt = await conn.query("INSERT INTO products_order(product_id, order_id, quantity) VALUES($1, $2, $3) returning *", [
                productOrder.productid, productOrder.orderid, productOrder.quantity
            ])
            conn.release()
            return stmt.rows[0]
        } catch(err) {
            throw new Error("Error: "+ err)
        }
    } // end of addToCart

}
