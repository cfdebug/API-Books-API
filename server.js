const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


// Configuration
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log('Connected to mongo: ', process.env.MONGO_URI) }
)


// Books
const booksController = require('./Controllers/books_controller.js')
app.use('/books', booksController)

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.listen(process.env.PORT, () => {
    console.log("Connected on Port: ", process.env.PORT)
})