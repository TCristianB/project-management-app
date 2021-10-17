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
	ticketDeveloper: {
		type: Schema.Types.ObjectId
	},
	ticketDeveloperName: {
		type: String
	},
	owner: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	ownerName: {
		type: String
	},
	ticketProject: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Project'
	},
	ticketProjectName: {
		type: String
	}
}, {
	timestamps: true
})

const Ticket = model('Ticket', ticketSchema)

module.exports = Ticket