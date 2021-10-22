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
		res.status(201).cookie('jwt', token, { httpOnly: true }).cookie('isLogged', true).send({ id: user._id, name: user.name })
	} catch (e) {
		res.status(400).send()
	}

}

exports.logInUser = async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()
		res.status(200).cookie('jwt', token, { httpOnly: true }).cookie('isLogged', true).send({ id: user._id, name: user.name, email: user.email })
	} catch (e) {
		res.status(500).send()
	}
}

exports.logOutUser = async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token
		})
		res.status(200).clearCookie('isLogged').clearCookie('jwt').send()
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

exports.getMe = async (req, res) => {
	try {
		res.status(200).send(req.user)
	} catch (e) {
		res.status(500).send()
	}
}

exports.updateMe = async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'lastName', 'email']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' })
	}

	try {
		updates.forEach((update) => {
			req.user[update] = req.body[update]
		})
		
		if(req.user.email !== 'demo@example.com') {
			await req.user.save()
		}

		res.status(200).send(req.user)
	} catch (e) {
		res.status(400).send(e)
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
