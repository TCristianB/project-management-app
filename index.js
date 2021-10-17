const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

require('./db/mongoose')

const { createTicket, createProjects } = require('./libs/InitialSetup')

const userRouter = require('./routes/user.routes')
const projectsRouter = require('./routes/project.routes')
const ticketsRouter = require('./routes/ticket.routes')

const PORT = process.env.PORT || 8000

app.use(cookieParser())
app.use(express.json())
createProjects()
createTicket()

app.use('/api/users', userRouter)

app.use('/api/projects', projectsRouter)

app.use('/api/tickets', ticketsRouter)

const server = app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))

module.exports = { app, server }