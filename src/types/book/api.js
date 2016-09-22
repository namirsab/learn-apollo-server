import rp from 'request-promise';
import _ from 'lodash';

rp.debug = true;

const GLOBAL_OPTIONS = {
    uri: 'https://www.googleapis.com/books/v1/volumes',
    json: true,
};

const bookFromVolume = ({ id, volumeInfo }) => {
    const isbn10 = _.find(volumeInfo.industryIdentifiers, {
        type: 'ISBN_10',
    });
    const isbn13 = _.find(volumeInfo.industryIdentifiers, {
        type: 'ISBN_13',
    });
    const isbnOther = _.find(volumeInfo.industryIdentifiers, {
        type: 'OTHER',
    });

    const book = {
        id,
        title: volumeInfo.title,
        industryIdentifiers: {
            isbn10: isbn10 ? isbn10.identifier : null,
            isbn13: isbn13 ? isbn13.identifier : null,
            other: isbnOther ? isbnOther.identifier : null,
        },
        authors: volumeInfo.authors ? volumeInfo.authors.map(name => ({ name })) : null,
    };

    return book;
};

const getBookByISBN = (isbn) => {
    const options = Object.assign({}, GLOBAL_OPTIONS, {
        qs: {
            q: `isbn:${isbn}`,
        },
    });
    return rp(options);
};

const searchBooks = (search) => {
    const options = Object.assign({}, GLOBAL_OPTIONS, {
        qs: {
            q: search,
        },
    });

    return rp(options);
};

export {
    getBookByISBN,
    searchBooks,
    bookFromVolume,
};
