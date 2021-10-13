const express = require('express')
const router = express.Router()

const { getTickets, createTicket, getTicketById, updateTicket } = require('../controllers/ticket.controllers')
const auth = require('../middleware/auth')

// Get all tickets
router.get('/', getTickets)

//Create a ticket
router.post('/', auth, createTicket)

//Get ticket by id
router.post('/:id', auth, getTicketById)

//Update a ticket
router.post('/:id', auth, updateTicket)

module.exports = router