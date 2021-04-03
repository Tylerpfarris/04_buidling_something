const express = require('express');
const app = express();
app.use(require('cors')());

app.use(express.static(`${__dirname}/../public`));
app.use(express.json());
app.use('/api/v1/books', require('./controllers/books'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

app.use((req, res, next) => {
    req.socket
})

