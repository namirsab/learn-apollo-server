import { bookFromVolume, searchBooks, getBookByISBN } from './book/api.js';

export default {
    Query: {
        books: {
            description: 'Return all books',
            resolve(root, { search }) {
                return searchBooks(search)
                    .then(({ totalItems, items}) => {
                        return items.map(({ volumeInfo }) => bookFromVolume(volumeInfo));
                    });
            }
        },
        book: {
            description: 'Returns a book',
            resolve(root, { isbn }) {
                return getBookByISBN(isbn)
                    .then(({ totalItems, items }) => {
                        if (totalItems > 0) {
                            const [{ volumeInfo }] = items;
                            return bookFromVolume(volumeInfo);
                        }
                        else {
                            return null;
                        }
                        
                    });
            }
        }
    }
};