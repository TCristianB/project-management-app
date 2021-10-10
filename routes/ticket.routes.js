const express = require('express')
const router = express.Router()

const { getTickets, createTicket } = require('../controllers/ticket.controllers')

// Get all tickets
router.get('/', getTickets)

//Create a ticket
router.post('/', createTicket)

module.exports = router