const { server } = require('../index')
const mongoose = require('mongoose')

const User = require('../models/User')
const { api, initialUsers } = require('./helpers')



beforeEach(async () => {
	await User.deleteMany({})

	for (const user of initialUsers) {
		const userObject = new User(user)
		await userObject.save()
	}
})



test('Get all users', async () => {
	await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
})

test('Create a user without email', async () => {
	const newUser = {
		name: 'Cristian',
		lastName: 'Barreto',
		password: 'test'
	}
	await api
		.post('/api/users/signUp')
		.send(newUser)
		.expect(400)

	const response = await api.get('/api/users')

	expect(response.body).toHaveLength(initialUsers.length)
})

test('Create a user', async () => {
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

	const response = await api.get('/api/users')
	const emails = response.body.map(user => user.email)

	expect(response.body).toHaveLength(initialUsers.length + 1)
	expect(emails).toContain(newUser.email)
})

afterAll(() => {
	mongoose.connection.close()
	server.close()
})