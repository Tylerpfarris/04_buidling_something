const pool = require('../utils/pool');

module.exports = class Book {
    id;
    author;
    title;
    genre;
    pages;
    quantity;

    constructor(row) {
        this.id = row.id;
        this.author = row.author;
        this.title = row.title;
        this.genre = row.genre;
        this.pages = row.pages;
        this.quantity = row.quantity;
    }

    static async insert({author, title, genre, pages, quantity}) {
        const { rows, } =
            await pool.query(`
        INSERT INTO books (author, title, genre, pages, quantity)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
            `,
                [author, title, genre, pages, quantity]);
    return new Book(rows[0])
    };
    
    static async getAll() {
        const { rows } =
            await pool.query(`
        SELECT *
        FROM books
        `);
        return rows.map(row => {
            return new Book(row);
        });
    }
    
    static async getById(id) {
        const { rows } =
            await pool.query(`
            SELECT *
            FROM books
            WHERE id = $1`, [id]);
        return new Book(rows[0]);
    }
    
    static async updateById({author, title, genre, pages, quantity}, id) {
        const { rows } =
            await pool.query(`
            UPDATE books
            SET author = $1, title = $2, genre = $3, pages = $4, quantity = $5
            WHERE id = $6
            RETURNING * 
            `, [
                author,
                title,
                genre,
                pages,
                quantity,
                id
            ]
            );
            console.log(rows)
        return new Book(rows[0]);
    }

    static async deleteByIdModel(id) {
        const {
            rows
        } = await pool.query(`
            DELETE
            FROM books
            WHERE id = $1
            RETURNING *
        `, [id]);
        if(!rows[0]) throw new Error(`no book with id ${id} found`)
        return new Book(rows[0])
    }
}

