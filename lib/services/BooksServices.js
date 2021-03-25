const Book = require('../models/Books');
const { sendEmail } = require('../utils/ses-client');

module.exports = class BookServices {
    static async create({ author, genre, pages, quantity }) {
        await sendEmail(

        )

        const book = await Book.insert({ author, genre, pages, quantity });
        return book;
        
    }
}