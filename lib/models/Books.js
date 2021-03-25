const pool = require('../utils/pool');

module.exports = class Book {
    id;
    author;
    genre;
    pages;
    quantity;

    constructor(row) {
        this.id = row.id;
        this.author = row.author;
        this.genre = row.genre;
        this.pages = row.pages;
        this.quantity = row.quantity;
    }

    static async insert(book) {
        const { rows, } =
            await pool.query(`
        INSERT INTO books (author, genre, pages, quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *
            `,
                [book.author, book.genre, book.pages, book.quantity]);
    return new Book(rows[0])
    };
    
}

