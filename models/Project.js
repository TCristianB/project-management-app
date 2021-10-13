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
	developers: [{
		type: Schema.Types.ObjectId
	}]
},{
	timestamps: true
})

const Project = model('Project', projectSchema)

module.exports = Project