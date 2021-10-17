const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

require('./db/mongoose')

const { createTicket, createProjects, createDemoUser } = require('./libs/InitialSetup')

const userRouter = require('./routes/user.routes')
const projectsRouter = require('./routes/project.routes')
const ticketsRouter = require('./routes/ticket.routes')

const PORT = process.env.PORT || 8000

app.use(cookieParser())
app.use(express.json())
createProjects()
createTicket()
createDemoUser()

app.use('/api/users', userRouter)

app.use('/api/projects', projectsRouter)

app.use('/api/tickets', ticketsRouter)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const server = app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))

module.exports = { app, server }