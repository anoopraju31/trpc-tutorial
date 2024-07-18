import { useEffect, useState, type FC } from 'react'
import { trpc } from './trpc'

const App: FC = () => {
	const [message, setMessage] = useState<string>('')

	useEffect(() => {
		const getMessage = async () => {
			const response = await trpc.secretData.query()
			setMessage(JSON.stringify(response))
		}

		getMessage()
	}, [])

	return (
		<div>
			<h1 className='text-3xl font-bold underline'>Hello world!</h1>
			<p> Message from server: {message} </p>
		</div>
	)
}

export default App
