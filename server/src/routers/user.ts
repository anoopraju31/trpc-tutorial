import { t } from '../trpc'
import { users } from '../data'
import { z } from 'zod'

// const userProcedure = t.procedure.input((v) => {
// 	if (typeof v === 'number') return v

// 	throw new Error('Invalid input: Expected number')
// })

let allUsers = users

const userProcedure = t.procedure.input(z.object({ userId: z.number() }))

const userRouter = t.router({
	getUser: t.procedure.query(() => {
		return { id: 1, name: 'Anoop Raju' }
	}),
	getUserById: userProcedure.query((v) => {
		const user = users.filter((user) => user.id === v.input.userId)

		return user[0]
	}),
	updateName: userProcedure
		.input(z.object({ name: z.string() }))
		.output(z.object({ id: z.number(), name: z.string() }))
		.mutation((req) => {
			allUsers = allUsers.map((user) =>
				user.id === req.input.userId ? { ...user, name: req.input.name } : user,
			)
			console.log(
				`Updating name of user with id ${req.input.userId} to ${req.input.name}`,
			)
			const user = allUsers.filter((user) => user.id === req.input.userId)[0]

			return user
		}),
})

export default userRouter
