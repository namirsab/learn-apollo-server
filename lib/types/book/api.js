'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchBooks = exports.getBookByISBN = undefined;

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_requestPromise2.default.debug = true;

var GLOBAL_OPTIONS = {
    uri: 'https://www.googleapis.com/books/v1/volumes',
    json: true
};

var getBookByISBN = function getBookByISBN(isbn) {
    var options = Object.assign({}, GLOBAL_OPTIONS, {
        qs: {
            q: 'isbn:' + isbn
        }
    });
    return (0, _requestPromise2.default)(options);
};

var searchBooks = function searchBooks(search) {
    var options = Object.assign({}, GLOBAL_OPTIONS, {
        qs: {
            q: search
        }
    });

    return (0, _requestPromise2.default)(options);
};

exports.getBookByISBN = getBookByISBN;
exports.searchBooks = searchBooks;