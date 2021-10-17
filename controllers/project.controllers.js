const Project = require('../models/Project')

exports.getProjets = async (req, res) => {
	try {
		const projects = await Project.find({})
		await req.user.populate({ path: 'projects' })

		res.status(200).send({projects: projects})
	} catch (e) {
		res.status(400).send()
	}
}

exports.createProject = async (req, res) => {
	const project = new Project({
		...req.body,
		owner: req.user._id
	})

	try {
		if(req.user.email !== 'demo@example.com') {
			await project.save()
		}

		res.status(201).send(project)
	} catch (e) {
		res.status(400).send()
	}
}

exports.getProjectById = async (req, res) => {
	const _id = req.params.id
	try {
		const project = await Project.findOne({ _id})

		if (!project) {
			res.status(404).send()
		}

		res.status(200).send(project)
	} catch (e) {
		res.status(500).send()
	}
}

exports.updateProject = async (req, res) => {
	const _id = req.params.id

	const updates = Object.keys(req.body)
	const allowedUpdates = ['title', 'description', 'developers', 'owner', 'date', 'createdAt', 'updatedAt']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' })
	}

	try {
		const project = await Project.findOne({ _id, owner: req.user._id })

		if (!project) {
			return res.status(404).send()
		}
		updates.forEach((update) => {
			project[update] = req.body[update]
		})

		if(req.user.email !== 'demo@example.com') {
			await project.save()
		}

		res.status(200).send(project)
	} catch (e) {
		console.log(e)
		res.status(500).send()
	}
}

exports.deleteProject = async (req, res) => {
	const _id = req.params.id

	try {
		if(req.user.email === 'demo@example.com') {
			return res.status(405).send()
		}

		const project = await Project.findOneAndDelete({ _id, owner: req.user._id })
		if (!project) {
			return res.status(404).send()
		}

		res.status(200).send(project)
	} catch (e) {
		res.status(500).send()
	}
}