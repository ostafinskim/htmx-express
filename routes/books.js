const express = require('express');
const {
    getAllBooks,
    addBook,
    deleteBook,
    getSingleBook,
    getSingleBookEditForm,
    updateBook,
    getBookDetails,
} = require('../controller/book');

const router = express.Router();

router.route('/').get(getAllBooks);
router.route('/submit').post(addBook);
router.route('/delete/:id').delete(deleteBook);

router.route('/get-book-details/:id').get(getBookDetails);
router.route('/get-book-row/:id').get(getSingleBook);
router.route('/get-edit-form/:id').get(getSingleBookEditForm);
router.route('/update/:id').put(updateBook);

module.exports = router;
