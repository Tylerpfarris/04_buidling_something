const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const Book = require('../lib/models/Books');
const request  = require('supertest');
const app = require('../lib/app');



// jest.mock('aws-sdk/clients/ses', () => {
//   const mSES = {
//     sendEmail: jest.fn().mockReturnThis(),
//     promise: jest.fn()

//   };
//   return jest.fn(() => mSES);
// });

describe('04_build_something routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const book = { author: 'xyz', title: 'stuff', genre: 'fiction', pages: 666, quantity: 1 };

  const dbBook = { author: 'xyz', title: 'stuff', genre: 'fiction', pages: 666, quantity: 1, id: "1" }
  
  it('creates a new book in our database and sends a conformation email', async () => {
    const res = await request(app)
      .post('/api/v1/books')
      .send(book)
    
    expect(res.body).toEqual(dbBook);
      
  });

  it('gets all books in the books DB', async () => {
    
   Book.insert(book);

    const result = await request(app)
      .get('/api/v1/books')
    

    expect(result.body).toEqual([dbBook]);
  });

  it('gets a book by its id', async () => {
   await Book.insert(book);
    const result = await request(app)
      .get('/api/v1/books/1')

    expect(result.body).toEqual(dbBook);
  })

  it('updates a book selected by id in book DB', async () => {

   await Book.insert(book);
    
    const updatedBook = { author: 'ABC', title: 'stuff',genre: 'NON-fiction', pages: 420, quantity: 66 }
    await request(app)
      .put('/api/v1/books/1')
      .send(updatedBook)
    
    const result = await Book.getById(1);
    const newUpdateBook = {
      ...updatedBook,
      id: '1'
    }
    expect(result).toEqual(newUpdateBook);
  })

  it('deletes a book selected by id in book DB', async () => {
    await Book.insert(book);
    await request(app)
      .delete('/api/v1/books/1')
    
    const bookDB = await Book.getAll();

    expect(bookDB).toEqual([]);
  })

 
});

