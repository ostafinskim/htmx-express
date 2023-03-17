const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    desc: {
        type: String,
    }
});

const Book = new mongoose.model('Book', BookSchema);

module.exports = Book;