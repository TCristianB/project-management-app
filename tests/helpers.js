
const { app } = require('../index')
const supertest = require('supertest')
const api = supertest(app)

const initialUsers = [
	{
		name: 'Jose',
		lastName: 'Jose',
		email: 'jose@example.com',
		password: 'test'
	},
	{
		name: 'Mark',
		lastName: 'Mark',
		email: 'mark@example.com',
		password: 'test'
	}
]



module.exports = {
	initialUsers,
	api
}