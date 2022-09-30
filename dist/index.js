"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JWT_1 = require("./middlewares/JWT");
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./routes/products"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const orders_1 = __importDefault(require("./routes/orders"));
require("./helpers/functions");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use('/', auth_1.default);
app.use('/products', products_1.default);
app.use('/users', users_1.default);
app.use('/orders', JWT_1.jwtverify, orders_1.default);
app.get('/', (req, res) => {
    res.send("frontstore");
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
