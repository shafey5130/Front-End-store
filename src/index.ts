import { jwtverify } from './middlewares/JWT';
import express from 'express'
import products from './routes/products'
import auth from './routes/auth'
import users from './routes/users'
import orders from './routes/orders'
import './helpers/functions'

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded());

app.use('/', auth)
app.use('/products', products)
app.use('/users', users)
app.use('/orders', jwtverify, orders)

app.get('/', (req: express.Request, res: express.Response) => {
    res.send("frontstore");
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})