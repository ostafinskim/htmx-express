const express = require('express');
const {
    getAllBooks,
    addBook,
    deleteBook,
    getSingleBook,
    getSingleBookEditForm,
    updateBook,
    getBookDetails,
    getModal,
} = require('../controller/book');
const { validateTitle, validateAuthor } = require('../controller/book-validation');

const router = express.Router();

router.route('/').get(getAllBooks);
router.route('/delete/:id').delete(deleteBook);

router.route('/submit').post(addBook);
router.route('/submit/title').post(validateTitle);
router.route('/submit/author').post(validateAuthor);

router.route('/get-book-row/:id').get(getSingleBook);
router.route('/get-edit-form/:id').get(getSingleBookEditForm);
router.route('/update/:id').put(updateBook);

router.route('/modal/:id').post(getModal);

module.exports = router;
