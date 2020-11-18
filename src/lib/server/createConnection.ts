import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import * as cors from 'cors'
import * as http from 'http'
import build from '../schema/build'

export default async (PORT: string, emitSchema = false): Promise<void> => {
	void createConnection()

	const app = express()

	app.use(
		cors({
			credentials: true,
			origin: 'http://localhost:3000'
		})
	)

	const server = new ApolloServer({
		schema: await build(true)
	})

	server.applyMiddleware({ app })

	const httpServer = http.createServer(app)
	server.installSubscriptionHandlers(httpServer)

	await httpServer.listen(PORT)
	console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
	console.log(
		`Subscriptions ready at http://localhost:${PORT}${server.subscriptionsPath}`
	)
}
