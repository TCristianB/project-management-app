const express = require('express')
const router = express.Router()

const { getTickets, createTicket, getTicketById, updateTicket, deleteTicket } = require('../controllers/ticket.controllers')
const auth = require('../middleware/auth')

// Get all tickets
router.get('/', auth, getTickets)

//Create a ticket
router.post('/', auth, createTicket)

//Get ticket by id
router.get('/:id', auth, getTicketById)

//Update a ticket
router.patch('/:id', auth, updateTicket)

//Delete a ticket
router.delete('/:id', auth, deleteTicket)

module.exports = router