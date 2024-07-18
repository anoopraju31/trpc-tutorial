import { type AppRouter } from './../../server/src/routers'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

const client = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: import.meta.env.VITE_APP_SERVER_URL!,
		}),
	],
})

async function main() {
	const result = await client.sayHi.query()

	console.log(result)
}

main()
