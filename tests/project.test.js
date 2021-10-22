const { server } = require('../index')
const mongoose = require('mongoose')

const Project = require('../models/Project')
const User = require('../models/User')
const { api, user } = require('./helpers')

describe('Testing the project routes', () => {
	beforeEach(async () => {
		await Project.deleteMany({})
		const findUser = await User.findOne({ email: user.email })
		const project = new Project({ title: 'Project new', description: 'This is the description', owner: findUser.id })

		await project.save()
	})

	test('Get all projects', async () => {
		const findUser = await User.findOne({ email: user.email })

		await api.get('/api/projects').set('Cookie', `jwt=${findUser.tokens[0].token}`).expect(200).expect('Content-Type', /application\/json/)
	})

	test('Create a project', async () => {
		const findUser = await User.findOne({ email: user.email })
		const project = {
			title: 'Task 2',
			description: 'This is the description 2',
			owner: '6172fb0be3009ab08a782faa'
		}

		await api.post('/api/projects').send(project).set('Cookie', `jwt=${findUser.tokens[0].token}`).expect(201).expect('Content-Type', /application\/json/)
	})

	test('Get a project by id', async () => {
		const findUser = await User.findOne({ email: user.email })
		const findProject = await Project.findOne({ title: 'Project new' })

		await api.get(`/api/projects/${findProject.id}`).set('Cookie', `jwt=${findUser.tokens[0].token}`).expect(200)
	})

	test('Update a project', async () => {
		const findUser = await User.findOne({ email: user.email })
		const findProject = await Project.findOne({ title: 'Project new' })

		const updatedProject = {
			title: 'Task updated'
		}

		await api.patch(`/api/projects/${findProject.id}`).set('Cookie', `jwt=${findUser.tokens[0].token}`).send(updatedProject).expect(200)
	})

	test('Delete a project', async () => {
		const findUser = await User.findOne({ email: user.email })
		const findProject = await Project.findOne({ title: 'Project new' })

		await api.delete(`/api/projects/${findProject.id}`).set('Cookie', `jwt=${findUser.tokens[0].token}`).expect(200)
	})
})

afterAll(() => {
	mongoose.connection.close()
	server.close()
})