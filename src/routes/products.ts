import express from 'express'
import { Product, ProductStore } from '../models/Product'
import { jwtverify } from '../middlewares/JWT'
import { JwtPayload } from 'jsonwebtoken'
import { auth } from '../helpers/functions';

const products = express.Router()

const product = new ProductStore()

products.get('/', async (req: express.Request, res: express.Response) => {
    try{
        res.send(await product.index())
    } catch(e) {
        res.status(500).send("Server Error")
    }
})

products.use('/create', jwtverify);
products.post('/create', async (req: express.Request, res: express.Response) => {
    try{
        if(!req.body.name || !req.body.price) {
            return res.status(400).send({
                "msgs":"Name and price is required"
            })
        }
        if(isNaN(req.body.price)) {
            return res.send({
                "msg":"Price must be numeric"
            })
        }

        let user: any = await auth(req)

        if(!user) {
            return res.status(401).send("Unauthorized action");
        }
        
        if(typeof user !== 'object' || !user.hasOwnProperty('id')) return;

        return res.status(201).send(await product.create({
            id: 0,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category ? req.body.category : null,
            userid: parseInt(user.id.toString()),
        }))
    } catch(e) {
        return res.status(500).send("Server Error")
    }
}) // end of create

products.get('/category/:category', async (req: express.Request, res: express.Response) => {
    try{
        res.send(await product.byCategory(req.params.category))
    } catch(e) {
        res.status(500).send("Server Error")
    }
})

products.get('/get/latest', async (req: express.Request, res: express.Response) => {
    try{
        res.send(await product.latest())
    } catch(e) {
        res.status(500).send("Server Error")
    }
})

products.get('/:id', async (req: express.Request, res: express.Response) => {
    try{
        res.send(await product.find(parseInt(req.params.id)))
    } catch(e) {
        res.status(500).send("Server Error")
    }
})

export default products