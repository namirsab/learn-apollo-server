import { bookFromVolume, searchBooks, getBookByISBN } from './book/api.js';

export default {
    Query: {
        books: {
            description: 'Return all books',
            resolve(root, { search }) {
                return searchBooks(search)
                    .then(({ items }) =>
                        items.map(({ id, volumeInfo }) => bookFromVolume({ id, volumeInfo })));
            },
        },
        book: {
            description: 'Returns a book',
            resolve(root, { isbn }) {
                return getBookByISBN(isbn)
                    .then(({ totalItems, items }) => {
                        if (totalItems > 0) {
                            const [{ id, volumeInfo }] = items;
                            return bookFromVolume({ id, volumeInfo });
                        }

                        return null;
                    });
            },
        },
    },
};
