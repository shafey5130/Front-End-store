"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
const functions_1 = require("../helpers/functions");
const auth = express_1.default.Router();
dotenv_1.default.config();
const users = new User_1.UserStore();
auth.post('/login', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.send((0, functions_1.JSONResponse)({
                "msg": "username and password are required",
            }));
        }
        const user = await users.login(req.body.username, req.body.password);
        if (!user) {
            return res.send((0, functions_1.JSONResponse)({
                "msg": "Username or password is invalid",
            }));
        }
        return res.send((0, functions_1.JSONResponse)({
            success: true,
            msg: jsonwebtoken_1.default.sign(user, process.env.JWT_KEY ? process.env.JWT_KEY : "VucO8hw09Aicw74!ZLA!q4Il"),
        }));
    }
    catch (err) {
        res.status(500).send((0, functions_1.JSONResponse)({
            "msg": "Server error",
        }));
    }
}); // end of login
auth.post('/register', async (req, res) => {
    try {
        if (!req.body.first_name || !req.body.last_name || !req.body.username || !req.body.password) {
            return res.send("first name and last name and username and password are required");
        }
        res.send((0, functions_1.JSONResponse)({
            "success": true,
            "msg": await users.register({
                id: 0,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: req.body.password,
            })
        }));
    }
    catch (err) {
        res.send((0, functions_1.JSONResponse)({
            "msg": "Use another username because it was exists",
        }));
    }
}); // end of register
exports.default = auth;
