const express = require('express')
const books = express.Router()
const Book = require('../Models/book.js')
const seedData = require('../Models/book_seed.js')


books.get('/seed', (req, res) => {
    console.log(seedData)
    Book.insertMany(seedData)
        .then(
            res.redirect('/books')
        )
        .catch(res.status(500).json({
            message: 'Seed unsuccessful'
        }))
})

// LIST SINGLE BOOK
books.get('/:id', (req, res) => {
    Book.findById(req.params.id)
    .then(book => {
        res.status(200).json({book})
    })
    .catch(err => {
        res.status(500).json({message: "Can't find book!"})
    })
})

// LIST ALL BOOKS
books.get('/', (req, res) => {
    Book.find()
    .then(foundBooks => {
        res.status(200).json({foundBooks})
    })
    .catch(err => {
        res.status(500).json({message:'Error'})
    })
})

// ADD BOOK
books.post('/', (req,res) => {
    console.log(req.body)
    Book.create(req.body)
    .then(newBook => {
        res.status(200).json({message:'Added Book to Database: ' + newBook})
    })
    .catch(err => {
        res.status(500).json({message:'Failed to add new book!' + err.message})
    })
})

// UPDATE
books.put('/:id', (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true , runValidators: true})
    .then(updatedBook => {
      res.status(200).json({message:'Book Updated'}) 
    })
    .catch(err => {
      res.status(500).json({message:'Error Updating Book!'})
    })
    
  })

// DELETE
books.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
    .then(deletedBook => {
      res.status(200).json({message:'Deleted Book Successfully'})
    })
    .catch(err => {
      res.status(500).json({message:'Error Deleting Book'})
    })
    
  })
module.exports = books