"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = exports.orderStatus = void 0;
const connection_1 = __importDefault(require("../helpers/connection"));
var orderStatus;
(function (orderStatus) {
    orderStatus[orderStatus["dispatched"] = 1] = "dispatched";
    orderStatus[orderStatus["canceled"] = 2] = "canceled";
    orderStatus[orderStatus["completed"] = 3] = "completed";
    orderStatus[orderStatus["closed"] = 4] = "closed";
})(orderStatus = exports.orderStatus || (exports.orderStatus = {}));
class OrderStore {
    async index() {
        try {
            const conn = await connection_1.default.connect();
            const stmt = await conn.query("SELECT * FROM orders");
            conn.release();
            return stmt.rows;
        }
        catch (err) {
            throw new Error("Error: " + err);
        }
    } // end of index
    async myOrders(userid) {
        try {
            const conn = await connection_1.default.connect();
            const stmt = await conn.query("SELECT * FROM orders WHERE userid=$1", [
                userid
            ]);
            conn.release();
            return stmt.rows;
        }
        catch (err) {
            throw new Error("Error: " + err);
        }
    } // end of myOrders
    async myCarts(userid) {
        try {
            const conn = await connection_1.default.connect();
            const stmt = await conn.query("SELECT * FROM orders INNER JOIN products_order ON products_order.order_id = orders.id WHERE orders.userid = $1", [
                userid
            ]);
            conn.release();
            return stmt.rows;
        }
        catch (err) {
            throw new Error("Error: " + err);
        }
    } // end of myCarts
    async create(Order) {
        try {
            const conn = await connection_1.default.connect();
            const stmt = await conn.query("INSERT INTO orders(status, userid) VALUES($1, $2) returning *", [
                Order.status, Order.userid
            ]);
            conn.release();
            return stmt.rows[0];
        }
        catch (err) {
            throw new Error("Error: " + err);
        }
    } // end of create
    async updateStatus(status, orderid, userid) {
        try {
            const conn = await connection_1.default.connect();
            const stmt = await conn.query("UPDATE orders SET status=$1 WHERE userid=$2 AND id=$3", [
                status, userid, orderid
            ]);
            conn.release();
            return stmt.rowCount;
        }
        catch (err) {
            throw new Error("Error: " + err);
        }
    } // end of updateStatus
    async addToCart(productOrder, userid) {
        try {
            const conn = await connection_1.default.connect();
            let stmt = await conn.query("SELECT * FROM orders WHERE id=$1 AND userid=$2", [
                productOrder.orderid, userid
            ]);
            if (stmt.rows.length == 0) {
                return "invalid orderid";
            }
            stmt = await conn.query("SELECT * FROM orders INNER JOIN products_order on orders.id = products_order.order_id WHERE products_order.product_id=$1 AND products_order.order_id=$2", [
                productOrder.productid, productOrder.orderid
            ]);
            if (stmt.rows.length > 0) {
                if (stmt.rows[0]['status'] == orderStatus.closed) {
                    return "order has been closed";
                }
                let quantity = parseInt(productOrder.quantity.toString()) + stmt.rows[0]['quantity'];
                quantity = quantity >= 0 ? quantity : 1;
                stmt = await conn.query("UPDATE products_order SET quantity = $3 WHERE product_id=$1 AND order_id=$2", [
                    productOrder.productid, productOrder.orderid, quantity
                ]);
                return "quantity updated to " + quantity.toString();
            }
            stmt = await conn.query("INSERT INTO products_order(product_id, order_id, quantity) VALUES($1, $2, $3) returning *", [
                productOrder.productid, productOrder.orderid, productOrder.quantity
            ]);
            conn.release();
            return stmt.rows[0];
        }
        catch (err) {
            throw new Error("Error: " + err);
        }
    } // end of addToCart
}
exports.OrderStore = OrderStore;
