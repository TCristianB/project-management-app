const Ticket = require('../models/Ticket')

exports.getTickets = async (req, res) => {
	try {
		const tickets = await Ticket.find({})
		res.status(200).send(tickets)
	} catch(e) {
		res.status(400).send(e)
	}
}

exports.createTicket = async (req, res) => {
	const ticket = new Ticket(req.body)
	try {
		await ticket.save()
		res.status(201).send(ticket)
	} catch(e) {
		res.status(400).send(e)
	}
}