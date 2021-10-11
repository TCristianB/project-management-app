const express = require('express')
const router = express.Router()

const { getUsers, createUser, logInUser, logOutUser,getUserById, updateUser } = require('../controllers/user.controllers.js')
const auth = require('../middleware/auth')
// GET all users
router.get('/', getUsers)

// Create a new user
router.post('/signUp', createUser)

// Log in a user
router.post('/signIn', logInUser)

// Log out a user
router.post('/signOut', auth, logOutUser)

// Get a user by his id
router.get('/:id', auth, getUserById)

// Update a user
router.patch('/:id', auth, updateUser)

module.exports = router