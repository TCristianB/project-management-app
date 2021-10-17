const { Schema, model } = require('mongoose')

const projectSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	owner: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	ownerName: {
		type: String
	},
	developers: [{
		_id: {
			type: String,
		},
		name: {
			type: String
		}
	}]
},{
	timestamps: true
})

projectSchema.virtual('tickets', {
	ref: 'Ticket',
	localField: '_id',
	foreignField: 'ticketProject'
})

const Project = model('Project', projectSchema)

module.exports = Project