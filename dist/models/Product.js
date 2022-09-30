"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const connection_1 = __importDefault(require("../helpers/connection"));
class ProductStore {
    async index() {
        try {
            const conn = await connection_1.default.connect();
            const stmt = await conn.query("SELECT * FROM products");
            conn.release();
            return stmt.rows;
        }
        catch (err) {
            throw new Error("Error: " + err);
        }
    } // end of index
    async find(id) {
        try {
            const conn = await connection_1.default.connect();
            const stmt = await conn.query("SELECT * FROM products WHERE id=$1", [
                id,
            ]);
            conn.release();
            return stmt.rows[0];
        }
        catch (err) {
            throw new Error("Error: " + err);
        }
    } // end of find
    async create(Product) {
        try {
            const conn = await connection_1.default.connect();
            const stmt = await conn.query("INSERT INTO products(name, price, category, userid) VALUES($1, $2, $3, $4) returning *", [
                Product.name, Product.price, Product.category ? Product.category : 'uncategory', Product.userid
            ]);
            conn.release();
            return stmt.rows[0];
        }
        catch (err) {
            throw new Error("Error: " + err);
        }
    } // end of create
    async latest(num = 5) {
        try {
            const conn = await connection_1.default.connect();
            const stmt = await conn.query("SELECT * FROM products ORDER BY id DESC LIMIT $1", [
                num,
            ]);
            conn.release();
            return stmt.rows;
        }
        catch (err) {
            throw new Error("Error: " + JSON.stringify(err));
        }
    } // end of latest
    async byCategory(category = 'uncategory') {
        try {
            const conn = await connection_1.default.connect();
            const stmt = await conn.query("SELECT * FROM products WHERE category=$1", [
                category,
            ]);
            conn.release();
            return stmt.rows;
        }
        catch (err) {
            throw new Error("Error: " + err);
        }
    } // end of latest
}
exports.ProductStore = ProductStore;
