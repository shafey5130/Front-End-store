"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = require("../models/Product");
const JWT_1 = require("../middlewares/JWT");
const functions_1 = require("../helpers/functions");
const products = express_1.default.Router();
const product = new Product_1.ProductStore();
products.get('/', async (req, res) => {
    try {
        res.send(await product.index());
    }
    catch (e) {
        res.status(500).send("Server Error");
    }
});
products.use('/create', JWT_1.jwtverify);
products.post('/create', async (req, res) => {
    try {
        if (!req.body.name || !req.body.price) {
            return res.status(400).send({
                "msgs": "Name and price is required"
            });
        }
        if (isNaN(req.body.price)) {
            return res.send({
                "msg": "Price must be numeric"
            });
        }
        let user = await (0, functions_1.auth)(req);
        if (!user) {
            return res.status(401).send("Unauthorized action");
        }
        if (typeof user !== 'object' || !user.hasOwnProperty('id'))
            return;
        return res.status(201).send(await product.create({
            id: 0,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category ? req.body.category : null,
            userid: parseInt(user.id.toString()),
        }));
    }
    catch (e) {
        return res.status(500).send("Server Error");
    }
}); // end of create
products.get('/category/:category', async (req, res) => {
    try {
        res.send(await product.byCategory(req.params.category));
    }
    catch (e) {
        res.status(500).send("Server Error");
    }
});
products.get('/get/latest', async (req, res) => {
    try {
        res.send(await product.latest());
    }
    catch (e) {
        res.status(500).send("Server Error");
    }
});
products.get('/:id', async (req, res) => {
    try {
        res.send(await product.find(parseInt(req.params.id)));
    }
    catch (e) {
        res.status(500).send("Server Error");
    }
});
exports.default = products;
