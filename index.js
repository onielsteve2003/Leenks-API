const express = require('express')
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
require('./config/db')();
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

// ROUTES
const userRoute = require('./routes/api/auth')
const linkRoute = require('./routes/api/link')

app.use('/api', userRoute)
app.use('/api', linkRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})