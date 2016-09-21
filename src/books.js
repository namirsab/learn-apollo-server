import rp from 'request-promise';

rp.debug = true;

const GLOBAL_OPTIONS = {
    uri: 'https://www.googleapis.com/books/v1/volumes',
    json: true
};

const getBookByISBN = isbn => {
    const options = Object.assign({}, GLOBAL_OPTIONS, {
        qs: {
            q: `isbn:${isbn}`
        }
    });
    return rp(options);
};

const searchBooks = search => {
    const options = Object.assign({}, GLOBAL_OPTIONS, {
        qs: {
            q: search
        }
    });
    
    return rp(options);
};

export {
    getBookByISBN,
    searchBooks
};