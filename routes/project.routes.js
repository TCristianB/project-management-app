const express = require('express')
const router = express.Router()

const { getProjets, createProject, getProjectById, updateProject, deleteProject } = require('../controllers/project.controllers')
const auth = require('../middleware/auth')

// Get all projects
router.get('/', auth, getProjets)

// Create a project
router.post('/', auth, createProject)

// Get a project by id
router.get('/:id', auth, getProjectById)

// Update a project
router.patch('/:id', auth, updateProject)

// Delete a project
router.delete('/:id', auth, deleteProject)

module.exports = router
