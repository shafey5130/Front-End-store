"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtverify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtverify = (req, res, next) => {
    const token = req.headers["Authorization"]?.toString().split(' ')[1] || req.headers["authorization"]?.toString().split(' ')[1] || req.body.jwt || req.query.jwt;
    if (!token) {
        return res.status(401).send("Unauthorized action");
    }
    try {
        if (jsonwebtoken_1.default.verify(token, process.env.JWT_KEY ? process.env.JWT_KEY : "VucO8hw09Aicw74!ZLA!q4Il")) {
            return next();
        }
        return res.status(401).send("Unauthorized action");
    }
    catch (err) {
        res.status(401).send("Invalid user token");
        return next();
    }
}; // end of jwtverify
exports.jwtverify = jwtverify;
