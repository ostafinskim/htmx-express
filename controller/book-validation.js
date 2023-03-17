const validateTitle = async (req, res) => {
    const { title } = req.body;
    if (title.length < 3 ) {
        return res.send(`
        <div class="mb-5" id="title_field" hx-target="div#title_field" hx-swap="outerHTML">
            <label
              for="title"
              class="mb-3 block text-base font-bold text-[#ff3c3c]"
            >
          Book title
        </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Book title"
              hx-post="/submit/title"
              class="w-full rounded-md border border-[#ff3c3c] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#ff3c3c] focus:shadow-md"
            />
            <span class="text-red-500">${title} is invalid. Minimum 3 characters required.</span>
      </div>
        `)
    } else {
        return res.send(`
        <div class="mb-5" id="title_field" hx-target="div#title_field" hx-swap="outerHTML">
        <label
          for="title"
          class="mb-3 block text-base font-bold text-[#07074D]"
        >
          Book title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          hx-post="/submit/title"
          placeholder="Book title"
          value="${title}"
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
        `)
    }
}

const validateAuthor = async (req, res) => {
    const { author } = req.body;
    if (author.length < 3 ) {
        return res.send(`
        <div class="mb-5" id="author_field" hx-target="div#author_field" hx-swap="outerHTML">
            <label
              for="author"
              class="mb-3 block text-base font-bold text-[#ff3c3c]"
            >
          Book author
        </label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder="Book author"
              hx-post="/submit/author"
              class="w-full rounded-md border border-[#ff3c3c] bg-white py-3 px-6 text-base font-medium text-[#ff3c3c] outline-none focus:border-[#ff3c3c] focus:shadow-md"
            />
            <span class="text-red-500">${author} is invalid. Minimum 5 characters required.</span>
      </div>
        `)
    } else {
        return res.send(`
        <div class="mb-5" id="author_field" hx-target="div#author_field" hx-swap="outerHTML">
        <label
          for="author"
          class="mb-3 block text-base font-bold text-[#07074D]"
        >
          Book author
        </label>
        <input
          type="text"
          name="author"
          id="author"
          hx-post="/submit/author"
          placeholder="Book author"
          value="${author}"
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
        `)
    }
}


module.exports = {
    validateTitle,
    validateAuthor,
}