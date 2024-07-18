import { adminProcedure, t } from '../trpc'
import userRouter from './user'

const appRouter = t.router({
	sayHi: t.procedure.query(() => {
		return 'Hi'
	}),
	logToServer: t.procedure
		.input((val) => {
			if (typeof val === 'string') return val

			throw new Error('Invalid Input: Expected string')
		})
		.mutation((req) => {
			console.log(req.input)

			return true
		}),
	secretData: adminProcedure.query(({ ctx }) => {
		console.log(ctx.user)

		return 'Super top secrect data'
	}),
	users: userRouter,
})

export type AppRouter = typeof appRouter

export default appRouter
