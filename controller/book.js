const Book = require('../model/Book');

const getAllBooks = async (req, res) => {
    const books = await Book.find({});
    return res.render('index', { books: books });
};

const addBook = async (req, res) => {
    const { title, author } = req.body;
    const book = { title, author };

    Book.create(book).then((x) => {
        return res.send(`<tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button class="btn btn-primary"
                hx-get="/get-edit-form/${x.null}">
                Edit Book
            </button>
        </td>
        <td>
            <button hx-delete="/delete/${x.null}}"
                class="btn btn-primary">
                Delete
            </button>
        </td>
    </tr>`);
    });
};

const deleteBook = (req, res) => {
    const { id } = req.params;
    Book.deleteOne({ _id: id });
    return res.send('');
};

const getSingleBook = async (req, res) => {
    const { id } = req.params;
    Book.find({ _id: id }).then(([{ title, author }]) => {
        return res.send(`<tr>
        <td>${title}</td>
        <td>${author}</td>
        <td>
            <button class="btn btn-primary"
                hx-get="/get-edit-form/${id}">
                Edit Book
            </button>
        </td>
        <td>
            <button hx-delete="/delete/${id}"
                class="btn btn-primary">
                Delete
            </button>
        </td>
    </tr>`);
    });
};

const getSingleBookEditForm = async (req, res) => {
    const { id } = req.params;
    await Book.find({ _id: id }).then(([{ title, author }]) => {
        return res.send(`
      <tr hx-trigger='cancel' class='editing' hx-get="/get-book-row/${id}">
        <td><input name="title" value="${title}"/></td>
        <td><input name="author" value="${author}"/></td>
        <td>
          <button class="btn btn-primary" hx-get="/get-book-row/${id}">
            Cancel
          </button>
          <button class="btn btn-primary" hx-put="/update/${id}" hx-include="closest tr">
            Save
          </button>
        </td>
    </tr>`);
    });
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    const newBook = { title, author };

    const updated = await Book.findOneAndUpdate({ _id: id }, newBook, {
        new: true,
    });
    return res.send(`
  <tr>
  <td>${updated.title}</td>
  <td>${updated.author}</td>
  <td>
      <button class="btn btn-primary"
          hx-get="/get-edit-form/${id}">
          Edit Book
      </button>
  </td>
  <td>
      <button hx-delete="/delete/${id}"
          class="btn btn-primary">
          Delete
      </button>
  </td>
</tr>
`);
};

const handleProgressBar = async (req, res) => {
    res.send(`
    <div hx-target="this"
        hx-get="/job" 
        hx-trigger="load delay:600ms" 
        hx-swap="outerHTML">
        <div class="progress">
          <div id="pb" class="progress-bar" style="width:0%"></div>
        </div>
    </div>`
    );
};

module.exports = {
    getAllBooks,
    addBook,
    deleteBook,
    getSingleBook,
    getSingleBookEditForm,
    updateBook,
    handleProgressBar,
};
