import { searchBooks, getBookByISBN } from './book/api.js';

export default {
    Query: {
        books: {
            description: 'Return all books',
            resolve(root, { search }) {
                return searchBooks(search);
            },
        },
        book: {
            description: 'Returns a book',
            resolve(root, { isbn }) {
                return getBookByISBN(isbn);
            },
        },
    },
};
