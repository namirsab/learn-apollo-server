import rp from 'request-promise';
import _ from 'lodash';

rp.debug = true;

/**
 * Object defining global options for request-promise
 */
const GLOBAL_OPTIONS = {
    uri: 'https://www.googleapis.com/books/v1/volumes',
    json: true,
};

/**
 * @typedef {Object} IndustryIdentifier
 * @desc Industry indentifer code definition
 * @prop {String} type - The type of the identifier
 * @prop {String} identifier - The actual identifier
 */

/**
 * @typedef {Object} Author
 * @desc Author of a volume
 * @prop {String} name - Name of the author
 */

/**
 * @typedef {Object} VolumeInfo
 * @desc Info for a volume
 * @prop {String} title - The title of the volume
 * @prop {IndustryIdentifier[]} [industryIdentifiers] - Array of industy identifiers
 * @prop {Author[]} authors - Array of authors
 */

/**
 * @typedef {Object} VolumeData
 * @desc Data from Google Books API to parse into a Book
 * @prop {String} id - The id of the volume
 * @prop {VolumeData~VolumeInfo} volumeInfo - Info about the volume
 */

/**
 * @typedef {Object} Book
 * @desc A book
 * @prop {String} title - The title of the book
 * @prop {Object} industryIdentifiers - The industry identifers of the book
 * @prop {String} industryIdentifiers.isbn10 - ISBN-10 code
 * @prop {String} industryIdentifiers.isbn13 - ISBN-13 code
 * @prop {String} industryIdentifiers.other - Other industry code
 */

/**
 * @function bookFromVolume
 * @desc Converts a volumeInfo object into a Book instance
 * @param {VolumeData} volumeData - The data of the volume
 * @returns {Book} The book obtained from the volume
 */
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

/**
 * @function getBookByIndustryIdentifier
 * @desc Get a Book from an industry identifier
 * @param {String} industryIdentifier
 * @returns {Promise.<Book>|null} A Book if the promise is fullfilled and the Book exists,
 *                                null if it does not exist
 */
const getBookByIndustryIdentifier = (industryIdentifier) => {
    const options = Object.assign({}, GLOBAL_OPTIONS, {
        qs: {
            q: `isbn:${industryIdentifier}`,
        },
    });
    return rp(options)
        .then(({ totalItems, items }) => {
            if (totalItems > 0) {
                const [{ id, volumeInfo }] = items;
                return bookFromVolume({ id, volumeInfo });
            }

            return null;
        });
};

/**
 * @function searchBooks
 * @param {String} search - The search query
 * @param {Object} [searchOptions] - An object defining search options
 * @param {Number} searchOptions.maxResults = 10 - Max results (default 10 max 40)
 * @returns {Promise.<Book[]>} An array of books if the promise is fullfilled
 */
const searchBooks = (search, { maxResults }) => {
    const options = Object.assign({}, GLOBAL_OPTIONS, {
        qs: {
            q: search,
            maxResults,
        },
    });

    return rp(options)
        .then(({ items }) =>
            items.map(({ id, volumeInfo }) => bookFromVolume({ id, volumeInfo })));
};

export {
getBookByIndustryIdentifier,
searchBooks,
bookFromVolume,
};
