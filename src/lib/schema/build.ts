import * as path from 'path'
import { buildSchema } from 'type-graphql'
import { GraphQLSchema } from 'graphql'

//! glob does not work within jest environment, so I have to import every resolver manually
import resolversArray from './resolvers'
// import Auth from '../../middleware/Auth'

export default async (emitSchema = false): Promise<GraphQLSchema> => {
	const schemaFilePath = emitSchema
		? path.resolve(__dirname, process.env.SCHEMA_PATH || './schema.graphql')
		: false

	return await buildSchema({
		resolvers: [...resolversArray],
		emitSchemaFile: schemaFilePath,
		// authChecker: Auth,
		validate: true
	})
}
