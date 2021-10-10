const express = require('express')
const router = express.Router()

const { getUsers, createUser, logInUser, logOutUser,getUserById, updateUser, deleteUser } = require('../controllers/user.controllers.js')

// GET all users
router.get('/', getUsers)

// Create a new user
router.post('/signUp', createUser)

// Log in a user
router.post('/signIn', logInUser)

// Log out a user
router.post('/signOut', logOutUser)

// Get a user by his id
router.get('/:id', getUserById)

// Update a user
router.patch('/:id', updateUser)

// Delete a user
router.delete('/:id', deleteUser)


module.exports = router