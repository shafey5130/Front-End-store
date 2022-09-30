import express from 'express'
import { User, UserStore } from '../models/User';
import { jwtverify } from '../middlewares/JWT'


const users = express.Router()

const user = new UserStore()

users.use(jwtverify);
users.get('/', async (req: express.Request, res: express.Response) => {
    try{
        res.send(await user.index())
    } catch(e) {
        res.status(500).send("Server Error")
    }
})

users.get('/:id', async (req: express.Request, res: express.Response) => {
    try{
        return res.send(await user.find(parseInt(req.params.id)))
    } catch(e) {
        return res.status(500).send("Server Error")
    }
})

export default users