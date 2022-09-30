"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Order_1 = require("../models/Order");
const functions_1 = require("../helpers/functions");
const orders = express_1.default.Router();
const order = new Order_1.OrderStore();
orders.get('/', async (req, res) => {
    try {
        res.send(await order.index());
    }
    catch (e) {
        res.status(500).send("Server Error");
    }
});
orders.get('/current', async (req, res) => {
    try {
        let user = await (0, functions_1.auth)(req);
        res.send(await order.myOrders(parseInt(user.id.toString())));
    }
    catch (e) {
        res.status(500).send("Server Error");
    }
});
orders.get('/carts', async (req, res) => {
    try {
        let user = await (0, functions_1.auth)(req);
        res.send(await order.myCarts(parseInt(user.id.toString())));
    }
    catch (e) {
        res.status(500).send("Server Error");
    }
});
orders.put('/:orderid/:status', async (req, res) => {
    try {
        let orderStatus = req.params.status;
        if (!req.params.orderid || !orderStatus) {
            return res.send("orderid & OrderStatus are required");
        }
        orderStatus = parseInt(orderStatus.toString());
        if (isNaN(parseInt(req.params.orderid)) || isNaN(orderStatus)) {
            return res.send("orderid & OrderStatus must be numeric");
        }
        if (!(orderStatus > 0 && orderStatus < 5)) {
            return res.send("orderStatus must be between 1 & 4");
        }
        let user = await (0, functions_1.auth)(req);
        res.send(await order.updateStatus(orderStatus, parseInt(req.params.orderid), parseInt(user.id.toString())) ? "status has been update" : "invalid orderid");
    }
    catch (e) {
        res.status(500).send("Server Error");
    }
}); // end of update order status 
orders.put('/:orderid', async (req, res) => {
    try {
        const params = ['orderid', 'quantity', 'productid'];
        if (!req.params.orderid || !req.body.quantity || !req.body.productid) {
            return res.send("orderid & productid & quantity are required");
        }
        if (isNaN(parseInt(req.params.orderid)) || isNaN(req.body.quantity) || isNaN(req.body.productid)) {
            return res.send("orderid & productid & quantity must be numeric");
        }
        let user = await (0, functions_1.auth)(req);
        res.send(await order.addToCart({
            id: 0,
            productid: req.body.productid,
            orderid: parseInt(req.params.orderid),
            quantity: req.body.quantity,
        }, user.id));
    }
    catch (e) {
        res.status(500).send("Server Error");
    }
}); // add to cart
orders.post('/create', async (req, res) => {
    try {
        let user = await (0, functions_1.auth)(req);
        res.status(201).send(await order.create({
            id: 0,
            userid: user.id,
            status: Order_1.orderStatus.dispatched,
        }));
    }
    catch (e) {
        res.status(500).send("Server Error");
    }
}); // end of create
exports.default = orders;
