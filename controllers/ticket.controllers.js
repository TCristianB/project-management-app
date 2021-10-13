const Ticket = require('../models/Ticket')

exports.getTickets = async (req, res) => {
	try {
		const tickets = await Ticket.find({})
		res.status(200).send(tickets)
	} catch (e) {
		res.status(400).send(e)
	}
}

exports.createTicket = async (req, res) => {
	const ticket = new Ticket(req.body)
	try {
		await ticket.save()
		res.status(201).send(ticket)
	} catch (e) {
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
	const allowedUpdates = ['title', 'description', 'ticketType', 'ticketPriority', 'ticketAssigned']
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
		res.status(500).send()
	}
}