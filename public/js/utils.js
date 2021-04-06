export const appendBook = (book) => {
   
    bookLi.textContent = `${book.author} - ${book.title} - ${book.genre} - ${book.pages} - ${book.quantity}`
    book
    bookUl.appendChild(bookLi)
};

export const postBook = (body) => {
    return fetch('/api/v1/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)

    })
        .then(res => res.json())
        .then((books) => {
            books.forEach(appendBook)
        });
        
}

export const getBooks = () => {
    return fetch('api/v1/books', {
        method: 'GET'
    })
        .then(res => res.json())
        .then((books) => {
            books.forEach(appendBook)
        });
        
}

