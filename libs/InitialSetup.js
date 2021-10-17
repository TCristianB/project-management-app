const Project = require('../models/Project')
const Ticket = require('../models/Ticket')
const User = require('../models/User')

exports.createTicket = async () => {
	const count = await Ticket.estimatedDocumentCount()

	if (count > 0) return

	try {
		await Promise.all([
			new Ticket({
				title: 'Ticket 1',
				description: 'This is the description',
				ticketType: 'UI',
				ticketPriority: 'High',
				ticketProject: '616afbde0647081f2154baf4',
				ticketProjectName: 'Project 3',
				createdAt: '2021-10-10T18:14:53.419Z',
				updatedAt: '2021-10-10T18:14:53.419Z',
				owner: '61699398ab9cbecec63cb2be',
				ownerName: 'Cristian',
				ticketDeveloper: '61699398ab9cbecec63cb2be',
				ticketDeveloperName: 'Cristian'
			}).save(),
			new Ticket({
				title: 'Ticket 2',
				description: 'This is the description',
				ticketType: 'Backend',
				ticketPriority: 'Low',
				ticketProject: '616afbde0647081f2154baf4',
				ticketProjectName: 'Project 3',
				createdAt: '2021-10-11T18:14:53.419Z',
				updatedAt: '2021-10-11T18:14:53.419Z',
				owner: '61699398ab9cbecec63cb2be',
				ownerName: 'Cristian',
				ticketDeveloper: '61699398ab9cbecec63cb2be',
				ticketDeveloperName: 'Cristian'
			}).save(),
			new Ticket({
				title: 'Ticket 3',
				description: 'This is the description',
				ticketType: 'UI',
				ticketPriority: 'High',
				ticketProject: '616afbde0647081f2154baf4',
				ticketProjectName: 'Project 3',
				createdAt: '2021-10-12T18:14:53.419Z',
				updatedAt: '2021-10-12T18:14:53.419Z',
				owner: '61699398ab9cbecec63cb2be',
				ownerName: 'Cristian',
				ticketDeveloper: '61699398ab9cbecec63cb2be',
				ticketDeveloperName: 'Cristian'
			}).save(),
			new Ticket({
				title: 'Ticket 4',
				description: 'This is the description',
				ticketType: 'UI',
				ticketPriority: 'High',
				ticketProject: '616afbde0647081f2154baf4',
				ticketProjectName: 'Project 3',
				createdAt: '2021-10-12T18:14:53.419Z',
				updatedAt: '2021-10-12T18:14:53.419Z',
				owner: '61699398ab9cbecec63cb2be',
				ownerName: 'Cristian',
				ticketDeveloper: '61699398ab9cbecec63cb2be',
				ticketDeveloperName: 'Cristian'
			}).save(), new Ticket({
				title: 'Ticket 5',
				description: 'This is the description',
				ticketType: 'UI',
				ticketPriority: 'High',
				ticketProject: '616afbde0647081f2154baf4',
				ticketProjectName: 'Project 3',
				createdAt: '2021-10-12T18:14:53.419Z',
				updatedAt: '2021-10-12T18:14:53.419Z',
				owner: '61699398ab9cbecec63cb2b4',
				ownerName: 'Cristian',
				ticketDeveloper: '61699398ab9cbecec63cb2be',
				ticketDeveloperName: 'Cristian'
			}).save()
		])
	} catch (e) {
		console.log(e)
	}

}

exports.createProjects = async () => {
	const count = await Project.estimatedDocumentCount()

	if (count > 0) return

	try {
		await Promise.all([
			new Project({
				title: 'Project 1',
				description: 'This is the project 1',
				owner: '61699398ab9cbecec63cb2be',
				ownerName: 'Cristian',
				createdAt: '2021-10-12T18:14:53.419Z',
				updatedAt: '2021-10-12T18:14:53.419Z',
				developers: [],
				tickets: []
			}).save(),
			new Project({
				title: 'Project 2',
				description: 'This is the project 2',
				owner: '61699398ab9cbecec63cb2be',
				ownerName: 'Cristian',
				developers: [],
				tickets: []
			}).save(),
			new Project({
				title: 'Project 3',
				description: 'This is the project 3',
				owner: '61699398ab9cbecec63cb2be',
				ownerName: 'Cristian',
				developers: [],
				tickets: []
			}).save(),
			new Project({
				title: 'Project 4',
				description: 'This is the project 4',
				owner: '61699398ab9cbecec63cb2be',
				ownerName: 'Cristian',
				developers: [],
				tickets: []
			}).save(),
			new Project({
				title: 'Project 5',
				description: 'This is the project 5',
				owner: '61699398ab9cbecec63cb2be',
				ownerName: 'Cristian',
				developers: [],
				tickets: []
			}).save(),
			new Project({
				title: 'Project 6',
				description: 'This is the project 6',
				owner: '61699398ab9cbecec63cb2be',
				ownerName: 'Cristian',
				developers: [],
				tickets: []
			}).save(),
			new Project({
				title: 'Project 7',
				description: 'This is the project 7',
				owner: '61699398ab9cbecec63cb2be',
				ownerName: 'Cristian',
				developers: [],
				tickets: []
			}).save()
		])
	} catch (e) {
		console.log(e)
	}
}

exports.createDemoUser = async () => {
	const count = await User.estimatedDocumentCount()

	if (count > 0) return

	try {
		await new User({
			name: 'Demo',
			lastName: 'Demo',
			email: 'demo@example.com',
			password: 'test'
		}).save()
	} catch (e) {
		console.log(e)
	}
}