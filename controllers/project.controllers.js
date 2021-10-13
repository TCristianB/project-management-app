const Project = require('../models/Project')

exports.getProjets = async (req, res) => {
	try {
		const projects = await Project.find({ developers: req.user._id })
		await req.user.populate({ path: 'projects' })

		res.status(200).send({projectOwner: req.user.projects, projects})
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
		await project.save()
		res.status(201).send(project)
	} catch (e) {
		res.status(400).send()
	}
}

exports.getProjectById = async (req, res) => {
	const _id = req.params.id
	try {
		const project = await Project.findOne({ _id, owner: req.user._id })

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
	const allowedUpdates = ['title', 'description']
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

		await project.save()

		res.status(200).send(project)
	} catch (e) {
		res.status(500).send()
	}
}

exports.deleteProject = async (req, res) => {
	const _id = req.params.id

	try {
		const project = await Project.findOneAndDelete({ _id, owner: req.user._id })

		if (!project) {
			return res.status(404).send()
		}

		res.status(200).send(project)
	} catch (e) {
		res.status(500).send()
	}
}