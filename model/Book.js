const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    author: {
        type: String,
        trim: true
    }
});

const Book = new mongoose.model('Book', BookSchema);

module.exports = Book;