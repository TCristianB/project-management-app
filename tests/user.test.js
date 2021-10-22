const { server } = require('../index')
const mongoose = require('mongoose')

const User = require('../models/User')
const { api, user } = require('./helpers')

describe('Testing the users route', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const user = new User({ name: 'jose', lastName: 'jose', email: 'jose@example.com', password: 'test' })

		await user.save()
	})

	test('Get all users', async () => {
		await api
			.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('Create a user without email', async () => {
		const usersDB = await User.find({})
		const usersAtStart = usersDB.map(user => user.toJSON())
		const newUser = {
			name: 'Cristian',
			lastName: 'Barreto',
			password: 'test'
		}
		await api
			.post('/api/users/signUp')
			.send(newUser)
			.expect(400)

		const usersDBAfter = await User.find({})
		const usersAtEnd = usersDBAfter.map(user => user.toJSON())

		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('Create a new user', async () => {
		const usersDB = await User.find({})
		const usersAtStart = usersDB.map(user => user.toJSON())

		const newUser = {
			name: 'Cristian',
			lastName: 'Barreto',
			email: 'ariwachi@gmail.com',
			password: 'test'
		}
		await api
			.post('/api/users/signUp')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)


		const usersDBAfter = await User.find({})
		const usersAtEnd = usersDBAfter.map(user => user.toJSON())

		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
	})

	test('Log in a user and logout a user', async () => {
		await api
			.post('/api/users/signIn')
			.send(user)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const findUser = await User.findOne({ email: user.email })
		await api.post('/api/users/signOut').set('Cookie', `jwt=${findUser.tokens[0].token}`).expect(200)
	})

	test('Get a user by id', async () => {
		await api
			.post('/api/users/signIn')
			.send(user)
			.expect(200)
			.expect('Content-Type', /application\/json/)
		
		const findUser = await User.findOne({ email: 'jose@example.com' })	
		await api.get(`/api/users/${findUser.id}`).set('Cookie', `jwt=${findUser.tokens[0].token}`).expect(200)
	})

	test('update a user', async () => {
		await api
			.post('/api/users/signIn')
			.send(user)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const updatedUser = {
			name: 'mark',
			lastName: 'johnson',
			password: 'test1'
		}
		const findUser = await User.findOne({ email: 'jose@example.com' })

		await api.patch(`/api/users/${findUser.id}`).set('Cookie', `jwt=${findUser.tokens[0].token}`).send(updatedUser).expect(200)
	})

})

afterAll(() => {
	mongoose.connection.close()
	server.close()
})