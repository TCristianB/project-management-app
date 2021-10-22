const { server } = require('../index')
const mongoose = require('mongoose')

const Ticket = require('../models/Ticket')
const Project = require('../models/Project')
const User = require('../models/User')
const { api, user } = require('./helpers')

describe('Testing the tickets routes', () => {
	beforeEach(async () => {
		await Ticket.deleteMany({})
		const findUser = await User.findOne({ email: user.email })
		const ticket = new Ticket({
			title: 'Ticket 1',
			description: 'This is the description',
			ticketType: 'UI',
			ticketPriority: 'High',
			ticketProject: '616afbde0647081f2154baf4',
			ticketProjectName: 'Project 3',
			createdAt: '2021-10-10T18:14:53.419Z',
			updatedAt: '2021-10-10T18:14:53.419Z',
			owner: findUser.id,
			ownerName: 'Cristian',
			ticketDeveloper: '61699398ab9cbecec63cb2be',
			ticketDeveloperName: 'Cristian'
		})
		await ticket.save()
	})

	test('Get all tickets', async () => {
		const findUser = await User.findOne({ email: user.email })

		await api.get('/api/tickets').set('Cookie', `jwt=${findUser.tokens[0].token}`).expect(200)
	})

	test('Create a ticket', async () => {
		const findUser = await User.findOne({ email: user.email })
		const findProject = await Project.findOne({ title: 'Project 1' })
		const newTicket = {
			title: 'Ticket 2',
			description: 'This is the description',
			ticketType: 'Backend',
			ticketPriority: 'Low',
			ticketProject: findProject._id,
			ticketProjectName: 'Project 3',
			createdAt: '2021-10-11T18:14:53.419Z',
			updatedAt: '2021-10-11T18:14:53.419Z',
			owner: findUser._id,
			ownerName: 'Cristian',
			ticketDeveloper: findUser._id,
			ticketDeveloperName: 'Cristian'
		}

		await api.post('/api/tickets').send(newTicket).set('Cookie', `jwt=${findUser.tokens[0].token}`).expect(201)
	})

	test('Get ticket by id', async () => {
		const findUser = await User.findOne({ email: user.email })
		const findTicket = await Ticket.findOne({ title: 'Ticket 1' })

		await api.get(`/api/tickets/${findTicket.id}`).set('Cookie', `jwt=${findUser.tokens[0].token}`).expect(200)
	})

	test('Update a ticket', async () => {
		const findUser = await User.findOne({ email: user.email })
		const findTicket = await Ticket.findOne({ title: 'Ticket 1' })
		const updatedTicket = {
			title: 'Ticket updated'
		}

		await api.patch(`/api/tickets/${findTicket.id}`).set('Cookie', `jwt=${findUser.tokens[0].token}`).send(updatedTicket).expect(200)
	})

	test('Delete a ticket', async () => {
		const findUser = await User.findOne({ email: user.email })
		const findTicket = await Ticket.findOne({ title: 'Ticket 1' })

		await api.delete(`/api/tickets/${findTicket.id}`).set('Cookie', `jwt=${findUser.tokens[0].token}`).expect(200)
	})
})

afterAll(() => {
	mongoose.connection.close()
	server.close()
})