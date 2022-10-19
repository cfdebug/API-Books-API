const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = new Schema({
    title: {Type:String},
    description: {Type:String},
    year: {Type:Number},
    quantity: {Type:Number},
    imageURL: {Type:String}
})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book