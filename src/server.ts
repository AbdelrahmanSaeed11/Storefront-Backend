import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import usersRouter from './handlers/users'
import prodRounter from './handlers/products'
import orderRouter from './handlers/orders'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
app.get('/', function (_req: Request, res: Response) {
    res.send('Hello World!')
})

usersRouter(app);
prodRounter(app);
orderRouter(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;