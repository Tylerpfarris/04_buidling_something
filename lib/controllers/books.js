const { Router } = require('express');
const BookServices = require('../services/BooksServices');

module.exports = Router()
    .post('/', async (req, res, next) => {
        BookServices
            .create(req.body)
            .then(book => res.send(book))
            .catch(next);
    })

    .get('/', async (req, res, next) => {
        BookServices
            .getAll()
            .then(books => res.send(books))
            .catch(next);
    })

    .get('/:id', async (req, res, next) => {
        const id = req.params.id;
        BookServices
            .getById(id)
            .then(book => res.send(book))
            .catch(next);
    })

    .put('/:id', async (req, res, next) => {
        const id = req.params.id;
        const {
            author,
            title,
            genre,
            pages,
            quantity
        } = req.body;
        BookServices
            .updateById(author, title, genre, pages, quantity, id)
            .then(book => res.send(book))
            .catch(next);
    })

    .delete('/:id', async (req, res, next) => {
        const id = req.params.id;
        BookServices
            .deleteById(id)
            .then(book => res.send(book))
            .catch(next);
    })