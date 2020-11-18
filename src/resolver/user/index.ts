import { Resolver, Query, Mutation, Args } from 'type-graphql'
import User from '../../database/entity/User'
import CreateUserArgs from './types/CreateUserArgs'

@Resolver()
export default class UserResolver {
	@Query(() => [User])
	async users(): Promise<User[]> {
		const users: User[] | null = await User.find()
		return users
	}

	@Mutation(() => User)
	async createUser(
		@Args() { name, password, email }: CreateUserArgs
	): Promise<User | null> {
		const user: User | null = await User.create({ name, password, email })

		return user.save()
	}
}
