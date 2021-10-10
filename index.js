const express = require('express')
const app = express()

require('./db/mongoose')

const userRouter = require('./routes/user.routes')

const ticketsRouter = require('./routes/ticket.routes')

const PORT = process.env.PORT || 8000

app.use(express.json())

app.use('/api/users', userRouter)

app.use('/api/tickets', ticketsRouter)

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))