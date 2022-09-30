"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayOnlyHave = exports.auth = exports.getToken = exports.JSONResponse = exports.passwordVerify = exports.passwordHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const config = process.env;
const passwordHash = (password) => {
    return bcrypt_1.default.hashSync(password + "7R52jB^NLzZ3", 12);
};
exports.passwordHash = passwordHash;
const passwordVerify = async (password, hashedPassword) => {
    return await bcrypt_1.default.compare(password + "7R52jB^NLzZ3", hashedPassword);
};
exports.passwordVerify = passwordVerify;
const JSONResponse = ({ msg, success = false }) => {
    return {
        "success": success,
        "data": msg,
    };
};
exports.JSONResponse = JSONResponse;
const getToken = (req) => {
    let token = req.headers['authorization'] || req.headers['Authorization'];
    if (!token) {
        return null;
    }
    return token.toString().split(' ')[1];
};
exports.getToken = getToken;
const auth = async (req) => {
    let token = (0, exports.getToken)(req);
    if (!token)
        return null;
    return await jsonwebtoken_1.default.verify(token, process.env.JWT_KEY ? process.env.JWT_KEY : "VucO8hw09Aicw74!ZLA!q4Il");
};
exports.auth = auth;
const isArrayOnlyHave = (arr, type) => {
    if (Array.isArray(arr)) {
        return arr.every(item => {
            return typeof item === type;
        });
    }
    return false;
};
exports.isArrayOnlyHave = isArrayOnlyHave;
