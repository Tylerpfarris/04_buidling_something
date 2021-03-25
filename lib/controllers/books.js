const { Router } = require('express');
const BookServices = require('../services/BooksServices');

module.exports = Router()
    .post('/', async (req, res, next) => {
        BookServices
            .create(req.body)
            .then(book => res.send(book))
            .catch(next);
})