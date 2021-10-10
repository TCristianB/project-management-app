const {Schema, model} = require('mongoose')

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
	}
})

const Project = model('Project', projectSchema)

module.exports = Project