const { Schema, model } = require('mongoose')

const ticketSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true
	},
	ticketType: {
		type: String,
		required: true
	},
	ticketPriority: {
		type: String,
		required: true
	},
	ticketAssigned: {
		type: Schema.Types.ObjectId
	}
},{
	timestamps: true
})

const Ticket = model('Ticket', ticketSchema)

module.exports = Ticket