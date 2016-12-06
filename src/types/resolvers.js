import { searchBooks, getBookByIndustryIdentifier, addToFavourites, getFavourites } from './book/api.js';


export default {
    Query: {
        books: {
            description: 'Return all books',
            resolve(root, { search, maxResults, startIndex }) {
                return searchBooks(search, { maxResults, startIndex });
            },
        },
        book: {
            description: 'Returns a book',
            resolve(root, { isbn }) {
                return getBookByIndustryIdentifier(isbn);
            },
        },
        favourites: {
            description: 'Get favourites books',
            resolve() {
                return getFavourites();
            }
        }
    },
    Mutation: {
        addToFavourites: {
            description: 'Save a book into the savedBooks database',
            resolve(root, { isbn }) {
                return addToFavourites(isbn);
            }
        }
    }
};
