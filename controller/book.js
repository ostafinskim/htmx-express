const Book = require('../model/Book');

const getAllBooks = async (req, res) => {
    const books = await Book.find({});
    const items = books.map(book => {
        return { id: book._id, title: book.title, author: book.author, description: book.description }
    })
    return res.render('index', { books: items });
};

const addBook = async (req, res) => {
    const { title, author, description } = req.body;
    if (!title || !author) {
        return res.send(`
            <p>Please provide title and author!</p>
        `)
    }

    const book = { title, author, description };

    Book.create(book).then((x) => {
        return res.send(`<tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
        <button class="btn btn-warning"
            hx-get="/get-book-details/${x._id}">
            View more
        </button>
        </td>
        <td>
            <button class="btn btn-success"
                hx-get="/get-edit-form/${x._id}">
                Edit Book
            </button>
        </td>
        <td>
            <button hx-delete="/delete/${x.null}}"
                class="btn btn-danger">
                Delete
            </button>
        </td>
    </tr>`);
    });
};

const deleteBook = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.send('');

    await Book.deleteOne({ _id: id });
    return res.send('');
};

const getSingleBook = async (req, res) => {
    const { id } = req.params;
    Book.find({ _id: id }).then(([{ title, author }]) => {
        return res.send(`<tr>
        <td>${title}</td>
        <td>${author}</td>
        <td>
            <button class="btn btn-success"
                hx-get="/get-edit-form/${id}">
                Edit Book
            </button>
        </td>
        <td>
            <button hx-delete="/delete/${id}"
                class="btn btn-danger">
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
          <button class="btn btn-warning" hx-get="/get-book-row/${id}">
            Cancel
          </button>
          <button class="btn btn-sucess" hx-put="/update/${id}" hx-include="closest tr">
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
      <button class="btn btn-success"
          hx-get="/get-edit-form/${id}">
          Edit Book
      </button>
  </td>
  <td>
      <button hx-delete="/delete/${id}"
          class="btn btn-danger">
          Delete
      </button>
  </td>
</tr>
`);
};

const getBookDetails = async (req, res) => {
    const { id } = req.params;

    if (!id) return;

    Book.find({ _id: id }).then(([{ _id: id, title, author, description }]) => {
        return res.send(`
        <div id="modal-backdrop" class="modal-backdrop fade show" style="display:block;"></div>
        <div id="modal" class="modal fade show" tabindex="-1" style="display:block;">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">${title}</h5>
                  <h6 class="modal-title">${id}</h6>
                </div>
                <div class="modal-body">
                  <p>Author: <span>${author}</span></p>
                  <p>Description: <span>${description ? description : "It's empty at the moment..."}</span></p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" onclick="closeModal()">Close</button>
                </div>
              </div>
            </div>
          </div>
        `);
    });
}



module.exports = {
    getAllBooks,
    addBook,
    deleteBook,
    getSingleBook,
    getSingleBookEditForm,
    updateBook,
    getBookDetails
};
