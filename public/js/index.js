
// import { postBook } from './utils.js';

const appendBook = (book) => {
    const bookLi = document.createElement('li');
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('deleteButtonOnLi')
    deleteButton.textContent = 'Delete'


    deleteButton.addEventListener('click', (e) => {
        const id = book.id
        
        fetch(`http://localhost:7890/api/v1/books/${id}`, {
            method: 'DELETE'
        })
        console.log(res)
            .then(res => res.text())
    });
    bookLi.textContent = `${book.author} - ${book.title} - ${book.genre} - ${book.pages} - ${book.quantity}`
    bookUl.appendChild(bookLi)
    bookLi.append(deleteButton)
};


const h1 = document.querySelector('h1');
const div = document.querySelector('div')
const listDiv = document.getElementById('listDiv')

const inputDiv = document.createElement('div')
inputDiv.classList.add('inputContainer')

const bookForm = document.createElement('form');
bookForm.classList.add('bookForm');

const bookFormHeader = document.createElement('h5');
bookFormHeader.classList.add('bookFormHeader');
bookFormHeader.textContent = 'Add Books To DB';

const titleInput = document.createElement('input');
titleInput.type = 'text';
titleInput.placeholder = 'Book Title';
titleInput.name = 'title';

const authorInput = document.createElement('input');
authorInput.type = 'text';
authorInput.placeholder = 'Author';
authorInput.name = 'author';

const genreInput = document.createElement('input');
genreInput.type = 'text';
genreInput.placeholder = 'Genre';
genreInput.name = 'genre';

const pagesInput = document.createElement('input');
pagesInput.type = 'number';
pagesInput.placeholder = 'Number of Pages';
pagesInput.name = 'pages';

const quantityInput = document.createElement('input');
quantityInput.type = 'number';
quantityInput.placeholder = 'Quantity';
quantityInput.name = 'quantity'




const formSubmitButton = document.createElement('button');
formSubmitButton.textContent = 'Submit';

const bookUl = document.createElement('ul')

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fd = new FormData(bookForm);

    fetch('http://localhost:7890/api/v1/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: fd.get('author'),
            title: fd.get('title'),
            genre: fd.get('genre'),
            pages: fd.get('pages'),
            quantity: fd.get('quantity')
        }),
    })
        .then(res => res.json())
        .then((books) => {
            books.forEach(appendBook)
        });
     
});



  
fetch('http://localhost:7890/api/v1/books/')
    .then((res) => res.json())
    .then((books) => {
        books.forEach(appendBook);
    });






div.append(bookForm);
inputDiv.append(
    titleInput,
    authorInput,
    genreInput,
    pagesInput,
    quantityInput);
bookForm.append(
    bookFormHeader,
    inputDiv,
    formSubmitButton,
    );
listDiv.append(bookUl);
