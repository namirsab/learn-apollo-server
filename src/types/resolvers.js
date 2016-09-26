import { searchBooks, getBookByIndustryIdentifier } from './book/api.js';

export default {
    Query: {
        books: {
            description: 'Return all books',
            resolve(root, { search, maxResults }) {
                return searchBooks(search, { maxResults });
            },
        },
        book: {
            description: 'Returns a book',
            resolve(root, { isbn }) {
                return getBookByIndustryIdentifier(isbn);
            },
        },
    },
};
