const Book = require('../models/Books');
const { sendDeleteEmail, sendInsertEmail, sendUpdateEmail } = require('../../ses-client');
const recipientEmail = process.env.AWS_EMAIL;

module.exports = class BookServices {
    static  async create({ author, title ,genre, pages, quantity }) {
        const book = await Book.insert({ author, title, genre, pages, quantity });
        await sendInsertEmail({ recipientEmail, name: 'Tyler' }, author, title, quantity)
        return book;
        
    }

    static async getAll() {
        const books = await Book.getAll();
        return books
    }

    static async getById(id) {
        const book = await Book
            .getById(id);
        return book;
    }

    static async updateById(author, title, genre, pages, quantity, id ) {
        const book = await Book
            .updateById({
                author,
                title,
                genre,
                pages,
                quantity
            }, id);
        await sendUpdateEmail({ recipientEmail, name: 'Tyler' }, author, title, quantity)
        return book;
    }

    static async deleteById(id) {

        const book = await Book
        .deleteByIdModel(id);
        await sendDeleteEmail({ recipientEmail, name: 'Tyler' }, title, quantity)
        return book
    }
}

