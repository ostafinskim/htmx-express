tailwind.config = {
    theme: {
        fontFamily: {
            sans: ['Mulish', 'sans-serif'],
            mono: ['Rokkitt', 'monospace'],
        },
    },
};


function closeModal() {
    const modal = document.querySelector('#modal');
    modal.classList.remove('active')
}

const form = document.querySelector('#form')

form.addEventListener('submit', (e) => {
        setTimeout(() => {
            const allInputs = form.querySelectorAll('input');
            const textarea = form.querySelector('textarea');
            const allFields = [...allInputs, textarea];
            allFields.forEach(field => field.value = "");  
        }, 900)
})