
const { app } = require('../index')
const supertest = require('supertest')
const api = supertest(app)

const user = {
	email: 'jose@example.com',
	password: 'test'
}

module.exports = {
	api,
	user
}