import { makeExecutableSchema } from 'graphql-tools';
import { getBookByISBN, searchBooks } from './books.js';
import _ from 'lodash';

const typeDefs = [`
    type Query {
        books(search: String!) : [Book]
        book(isbn: String!) : Book
    }
    
    type Book {
        title: String!
        isbn: String
    }
    
    schema {
        query: Query
    }
`];

const resolvers = {
    Query: {
        books: {
            description: 'Return all books',
            resolve(root, { search }) {
                return searchBooks(search)
                    .then(({ totalItems, items}) => {
                        return items.map(({ volumeInfo }) => {
                            const isbn10 = _.find(volumeInfo.industryIdentifiers, { type: 'ISBN_10' });
                            const isbn13 = _.find(volumeInfo.industryIdentifiers, { type: 'ISBN_13' });
                            const isbnOther = _.find(volumeInfo.industryIdentifiers, { type: 'OTHER' });
                            
                            const book = {
                                title: volumeInfo.title,
                                isbn: (isbn13 && isbn13.identifier) || (isbn10 && isbn10.identifier) || (isbnOther && isbnOther.identifier)
                            };
                            
                            return book;
                        });
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
                            return {
                                title: volumeInfo.title,
                                isbn: _.find(volumeInfo.industryIdentifiers, { type: 'ISBN_10' }).identifier,
                            };
                        }
                        else {
                            return null;
                        }
                        
                    });
            }
        }
    },
    Book: {
        __description: 'A simple book'
    }
};

export default makeExecutableSchema({
    typeDefs,
    resolvers
});