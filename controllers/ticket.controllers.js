const Ticket = require('../models/Ticket')
const User = require('../models/User')
const Project = require('../models/Project')

exports.getTickets = async (req, res) => {
	try {
		const tickets = await Ticket.find({})
		res.status(200).send(tickets)
	} catch (e) {
		res.status(400).send(e)
	}
}

exports.createTicket = async (req, res) => {
	console.log(req.body)
	const { title, description, ticketType, ticketPriority, ticketProject, ticketDeveloper } = req.body
	const findTicketDeveloper = await User.findById(ticketDeveloper)
	const findTicketProject = await Project.findById(ticketProject)

	const ticket = new Ticket({
		title,
		description,
		ticketType,
		ticketProject: findTicketProject.id,
		ticketPriority,
		ticketDeveloper: findTicketDeveloper._id,
		owner: req.user._id,
		ownerName: req.user.name,
		ticketDeveloperName: findTicketDeveloper.name,
		ticketProjectName: findTicketProject.title
	})
	console.log(findTicketProject)
	try {
		await ticket.save()
		res.status(201).send(ticket)
	} catch (e) {
		console.log(e)
		res.status(400).send(e)
	}
}

exports.getTicketById = async (req, res) => {
	const _id = req.params.id
	try {
		const ticket = await Ticket.findOne({ _id })

		if (!ticket) {
			res.status(404).send()
		}

		res.status(200).send(ticket)
	} catch (e) {
		res.status(500).send()
	}
}

exports.updateTicket = async (req, res) => {
	const _id = req.params.id

	const updates = Object.keys(req.body)
	const allowedUpdates = ['title', 'description', 'ticketType', 'ticketPriority', 'ticketAssigned', 'ticketDeveloper', 'ticketDeveloperName', 'ticketProject', 'ticketProjectName']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' })
	}

	try {
		const ticket = await Ticket.findOne({ _id, owner: req.user._id })

		if (!ticket) {
			return res.status(404).send()
		}
		updates.forEach((update) => {
			ticket[update] = req.body[update]
		})

		await ticket.save()

		res.status(200).send(ticket)

	} catch (e) {
		console.log(e)
		res.status(500).send()
	}
}

exports.deleteTicket = async (req, res) => {
	const _id = req.params.id

	try {
		const ticket = await Ticket.findByIdAndDelete({ _id, owner: req.user._id })
		
		if(!ticket) {
			res.stats(404).send()
		}
		
		res.send()
	} catch (e) {
		res.status(500).send()
	}
}