"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const JWT_1 = require("../middlewares/JWT");
const users = express_1.default.Router();
const user = new User_1.UserStore();
users.use(JWT_1.jwtverify);
users.get('/', async (req, res) => {
    try {
        res.send(await user.index());
    }
    catch (e) {
        res.status(500).send("Server Error");
    }
});
users.get('/:id', async (req, res) => {
    try {
        return res.send(await user.find(parseInt(req.params.id)));
    }
    catch (e) {
        return res.status(500).send("Server Error");
    }
});
exports.default = users;
