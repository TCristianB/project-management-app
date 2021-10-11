const User = require('../models/User')

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({})
		res.status(200).send(users)
	} catch (e) {
		console.log(e)
	}

}

exports.createUser = async (req, res) => {
	const user = new User(req.body)
	try {
		const token = await user.generateAuthToken()
		await user.save()
		res.status(201).send({ user, token })
	} catch (e) {
		res.status(400).send()
	}

}

exports.logInUser = async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()
		res.status(200).send({ user, token })
	} catch (e) {
		res.status(500).send()
	}
}

exports.logOutUser = async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token
		})
		await req.user.save()
		res.status(200).send(req.user)
	} catch (e) {
		res.status(500).send()
	}
}

exports.getUserById = async (req, res) => {
	const _id = req.params.id

	try {
		const user = await User.findById(_id)
		if (!user) {
			throw new Error()
		}
		res.status(200).send(user)
	} catch (e) {
		res.status(500).send()
	}
}

exports.updateUser = async (req, res) => {
	const _id = req.params.id

	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'lastName', 'password']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({
			error: 'Invalid Updates!'
		})
	}

	try {
		const user = await User.findById(_id)

		if (!user) {
			return res.status(404).send()
		}

		updates.forEach((update) => {
			user[update] = req.body[update]
		})

		await user.save()

		res.status(200).send()
	} catch (e) {
		res.status(400).send()
	}
}
