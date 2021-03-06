const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
})

userSchema.virtual('projects', {
	ref: 'Project',
	localField: '_id',
	foreignField: 'owner'
})

userSchema.virtual('tickets', {
	ref: 'Ticket',
	localField: '_id',
	foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

	user.tokens = user.tokens.concat({ token })
	await user.save()

	return token
}

userSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens

	return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email })

	if (!user) {
		throw new Error('Unable to login')
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if (!isMatch) {
		throw new Error('Unable to login')
	}

	return user
}

userSchema.pre('save', async function (next) {
	const user = this

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}

	next()
})

const User = model('User', userSchema)

module.exports = User