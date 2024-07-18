import express, { type Request, type Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import appRouter from './routers'
import { createContext } from './context'

const app = express()
const PORT = process.env.PORT || 7000

app.use(cors({ origin: process.env.CLIENT_URL! }))
app.use(
	'/trpc',
	createExpressMiddleware({ router: appRouter, createContext: createContext }),
)

app.get('/health', (req: Request, res: Response) => {
	return res.json({
		status: 'success',
		message: 'Server is running fine.',
	})
})

app.listen(PORT, () => console.log(`server started at port ${PORT}.`))
