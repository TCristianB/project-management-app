const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '.env')})

require('./db/mongoose')

const userRouter = require('./routes/user.routes')

const ticketsRouter = require('./routes/ticket.routes')
const PORT = process.env.PORT || 8000

app.use(express.json())

app.use('/api/users', userRouter)

app.use('/api/tickets', ticketsRouter)

const server = app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))

module.exports = {app, server}