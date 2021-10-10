const User = require('../models/User')

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find({})
		res.send(users)
	} catch (e) {
		console.log(e)
	}

}

exports.createUser = async (req, res) => {
	const user = new User(req.body)
	try {
		const token = await user.generateAuthToken()
		await user.save()
		res.send({ user, token })
	} catch (e) {
		console.log(e)
	}

}

exports.logInUser = async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()
		res.send({ user, token })
	} catch (e) {
		res.status(500).send()
	}
}

exports.logOutUser = async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			console.log(token.token)
			return token.token !== req.token
		})
		await req.user.save()
		res.send(req.user)
	} catch (e) {
		res.status(500).send()
	}
}

exports.getUserById = (req, res) => {

}

exports.updateUser = (req, res) => {

}

exports.deleteUser = (req, res) => {

}