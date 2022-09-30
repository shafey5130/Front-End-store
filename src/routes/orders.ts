import express from 'express';
import { OrderStore, orderStatus } from '../models/Order';
import { auth, isArrayOnlyHave } from '../helpers/functions';

const orders = express.Router();

const order = new OrderStore();

orders.get('/', async (req: express.Request, res: express.Response) => {
    try{
        res.send(await order.index());
    } catch(e) {
        res.status(500).send("Server Error")
    }
})

orders.get('/current', async (req: express.Request, res: express.Response) => {
    try{
        let user: any = await auth(req)
        res.send(await order.myOrders(parseInt(user.id.toString())));
    } catch(e) {
        res.status(500).send("Server Error")
    }
})

orders.get('/carts', async (req: express.Request, res: express.Response) => {
    try{
        let user: any = await auth(req)
        res.send(await order.myCarts(parseInt(user.id.toString())));
    } catch(e) {
        res.status(500).send("Server Error")
    }
})

orders.put('/:orderid/:status', async (req: express.Request, res: express.Response) => {
    try{
        let orderStatus: any = req.params.status;
        if(!req.params.orderid || !orderStatus) {
            return res.send("orderid & OrderStatus are required")
        }

        orderStatus = parseInt(orderStatus.toString());

        if(isNaN(parseInt(req.params.orderid)) || isNaN(orderStatus)) {
            return res.send("orderid & OrderStatus must be numeric")
        }

        if(!(orderStatus > 0 && orderStatus < 5)) {
            return res.send("orderStatus must be between 1 & 4")
        }

        let user: any = await auth(req)
        res.send(await order.updateStatus(
            orderStatus,
            parseInt(req.params.orderid),
            parseInt(user.id.toString()),
        ) ? "status has been update" : "invalid orderid");

    } catch(e) {
        res.status(500).send("Server Error")
    }

}) // end of update order status 

orders.put('/:orderid', async (req: express.Request, res: express.Response) => {
    try{
        const params = ['orderid', 'quantity', 'productid'];
        
        if(!req.params.orderid || !req.body.quantity || !req.body.productid) {
            return res.send("orderid & productid & quantity are required")
        }

        if(isNaN(parseInt(req.params.orderid)) || isNaN(req.body.quantity) || isNaN(req.body.productid)) {
            return res.send("orderid & productid & quantity must be numeric")
        }

        let user: any = await auth(req)
        res.send(await order.addToCart({
            id: 0,
            productid: req.body.productid,
            orderid: parseInt(req.params.orderid),
            quantity: req.body.quantity,
        }, user.id));
    } catch(e) {
        res.status(500).send("Server Error")
    }
}) // add to cart

orders.post('/create', async (req: express.Request, res: express.Response) => {
    try{
        let user: any = await auth(req);
        res.status(201).send(await order.create({
            id: 0,
            userid: user.id,
            status: orderStatus.dispatched,
        }));
    } catch(e) {
        res.status(500).send("Server Error")
    }
}) // end of create

export default orders;