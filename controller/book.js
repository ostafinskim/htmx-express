const Book = require('../model/Book');

const getAllBooks = async (req, res) => {
    const books = await Book.find({});
    const items = books.map((book) => {
        return {
            id: book._id,
            title: book.title,
            author: book.author,
            desc: book.desc,
        };
    });
    return res.render('index', { books: items });
};

const addBook = async (req, res) => {
    const book = req.body;
    Book.create(book).then((x) => {
        return res.send(`
		<tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
        	<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${x.title}</td>
        	<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${x.author}</td>
        	<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
				<button
					class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
					hx-post='/modal/${x.id}'
					hx-target='#modal'
					hx-indicator="#spinner"
					hx-swap='outerHTML swap: 0.5s'
					_='on click add .active to #modal'
					>View more
				</button>
            	<button class='border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline'
            	    hx-get="/get-edit-form/${x._id}">
            	    Edit Book
            	</button>
            	<button hx-delete="/delete/${x._id}"
            		class='border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline'>
            	    Delete
            	</button>
        	</td>
    	</tr>`
		);
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
        return res.send(`
		<tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
        	<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${title}</td>
        	<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${author}</td>
        	<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        		<button class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
        			hx-get="/get-book-details/${id}">
        			View more
    			</button>
            	<button class='border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline'
            	    hx-get="/get-edit-form/${id}">
            	    Edit Book
            	</button>
            	<button hx-delete="/delete/${id}"
            		class='border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline'>
            	    Delete
            	</button>
        	</td>
    	</tr>`
		);
	});
};

const getSingleBookEditForm = async (req, res) => {
    const { id } = req.params;
    await Book.find({ _id: id }).then(([{ title, author }]) => {
        return res.send(`
      	<tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" hx-trigger='cancel' class='editing' hx-get="/get-book-row/${id}">
        	<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"><input  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"name="title" value="${title}"/></td>
        	<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"><input  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" name="author" value="${author}"/></td>
        	<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          		<button class='border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline' hx-get="/get-book-row/${id}">
            		Cancel
          		</button>
          		<button class='border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline' hx-put="/update/${id}" hx-include="closest tr">
          		  Save
          		</button>
        	</td>
    	</tr>`
		);
    });
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    const newBook = { title, author };
    const updated = await Book.findOneAndUpdate({ _id: id }, newBook, { new: true });
    	return res.send(`
  			<tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
  				<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${updated.title}</td>
  				<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${updated.author}</td>
  				<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  					<button class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
 	 					hx-get="/get-book-details/${id}">
  						View more
					</button>
      				<button class='border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline'
      				    hx-get="/get-edit-form/${id}">
      				    Edit Book
      				</button>
      				<button hx-delete="/delete/${id}"
      					class='border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline'>
      				    Delete
      				</button>
  				</td>
			</tr>
`);
};

const getModal = async (req, res) => {
	const { id } = req.params;
	const bookDetails = await Book.findOne({ _id: id });

	return res.send(`
	<div id="modal" class="active relative z-10 ease-out duration-300" aria-labelledby="modal-title" role="dialog" aria-modal="true">
	<div class="fixed inset-0 bg-gray-500 bg-opacity-75 ease-in duration-200 transition-opacity"></div>
  
	<div class="fixed inset-0 z-10 overflow-y-auto">
	  <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		<div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
		  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
			<div class="sm:flex sm:items-start">
			  <div class="my-5 text-center sm:mt-0 sm:ml-4 sm:text-left">
				<button class="absolute right-10 bg-red-500 rounded-lg p-2" onclick="closeModal()">X</button>
				<div class="mt-8">
				  <h2 class="mt-4 text-base font-semibold leading-6 text-gray-900" id="modal-title">${bookDetails.id}</h2>
				  <h3 class="mt-4 text-base font-semibold leading-6 text-gray-900" id="modal-title">${bookDetails.author}</h3>
				  <h4 class="mt-4 text-base font-semibold leading-6 text-gray-900">${bookDetails.title}</h4>
				<p class="mt-4 text-sm text-gray-500">${bookDetails.desc}</p>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
	`)
}

module.exports = {
    getAllBooks,
    addBook,
    deleteBook,
    getSingleBook,
    getSingleBookEditForm,
    updateBook,
	getModal
};
