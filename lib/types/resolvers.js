'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _api = require('./book/api.js');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    Query: {
        books: {
            description: 'Return all books',
            resolve: function resolve(root, _ref) {
                var search = _ref.search;

                return (0, _api.searchBooks)(search).then(function (_ref2) {
                    var totalItems = _ref2.totalItems;
                    var items = _ref2.items;

                    return items.map(function (_ref3) {
                        var volumeInfo = _ref3.volumeInfo;

                        var isbn10 = _lodash2.default.find(volumeInfo.industryIdentifiers, { type: 'ISBN_10' });
                        var isbn13 = _lodash2.default.find(volumeInfo.industryIdentifiers, { type: 'ISBN_13' });
                        var isbnOther = _lodash2.default.find(volumeInfo.industryIdentifiers, { type: 'OTHER' });

                        var book = {
                            title: volumeInfo.title,
                            isbn: isbn13 && isbn13.identifier || isbn10 && isbn10.identifier || isbnOther && isbnOther.identifier
                        };

                        return book;
                    });
                });
            }
        },
        book: {
            description: 'Returns a book',
            resolve: function resolve(root, _ref4) {
                var isbn = _ref4.isbn;

                return (0, _api.getBookByISBN)(isbn).then(function (_ref5) {
                    var totalItems = _ref5.totalItems;
                    var items = _ref5.items;

                    if (totalItems > 0) {
                        console.log(items);

                        var _items = _slicedToArray(items, 1);

                        var volumeInfo = _items[0].volumeInfo;

                        return {
                            title: volumeInfo.title,
                            isbn: _lodash2.default.find(volumeInfo.industryIdentifiers, { type: 'ISBN_10' }).identifier
                        };
                    } else {
                        return null;
                    }
                });
            }
        }
    }
};