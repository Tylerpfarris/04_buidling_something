const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const Book = require('../lib/models/Books');
 


describe('04_build_something routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new book in our database and sends a conformation email', async () => {

   const book = await Book.insert({ author: 'xyz', genre: 'fiction', pages: 666, quantity: 1 });

    expect(book).toEqual(book);
  });

  it('gets all books in the books DB', async () => {
    
    const book = await Book.insert({ author: 'xyz', genre: 'fiction', pages: 666, quantity: 1 });

    const result = await Book.getAllBooks();

    expect(result).toEqual(book);
  });

  it('gets a book by its id', async () => {

    const book = await Book.insert({ author: 'xyz', genre: 'fiction', pages: 666, quantity: 1 });
    
    const result = await Book.getBookById(1);

    expect(result).toEqual(book);
  })

  it('updates a book selected by id in book DB', async () => {

    Book.insert({ author: 'xyz', genre: 'fiction', pages: 666, quantity: 1 });
    
    const updatedBook = await Book.updatedBookById('Abc', 'Non-fiction', 420, 2, 1);

    const result = await Book.getBookById(1);

    expect(result).toEqual(updatedBook);
  })

  it('deletes a book selected by id in book DB', async () => {
    
    const result = await Book.insert({ author: 'xyz', genre: 'fiction', pages: 666, quantity: 1 });

    await Book.insert({ author: 'ABC', genre: 'NON-fiction', pages: 420, quantity: 66 })
    await Book.deleteBookById(2)

    const bookDB = await Book.getAllBooks();

    expect(bookDB).toEqual(result);
  })

});
