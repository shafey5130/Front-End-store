"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const connection_1 = __importDefault(require("../helpers/connection"));
require("../helpers/functions");
const functions_1 = require("../helpers/functions");
class UserStore {
    async register(user) {
        try {
            const conn = await connection_1.default.connect();
            const sql = 'INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = await (0, functions_1.passwordHash)(user.password);
            const result = await conn.query(sql, [user.first_name, user.last_name, user.username, hash]);
            user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`unable create user (${user.username}): ${err}`);
        }
    } // end of create
    async login(username, password) {
        try {
            const conn = await connection_1.default.connect();
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const result = await conn.query(sql, [username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (await (0, functions_1.passwordVerify)(password, user.password)) {
                    return user;
                }
            }
            return null;
        }
        catch (err) {
            throw new Error("Something went wrong");
        }
    } // end of login
    async index() {
        try {
            const conn = await connection_1.default.connect();
            const stmt = await conn.query("SELECT id, first_name, last_name FROM users");
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
            const stmt = await conn.query("SELECT id, first_name, last_name FROM users WHERE id=$1", [
                id,
            ]);
            conn.release();
            return stmt.rows[0];
        }
        catch (err) {
            throw new Error("Error: " + err);
        }
    } // end of find
}
exports.UserStore = UserStore;
