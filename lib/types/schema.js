"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n    type Query {\n        books(search: String!) : [Book]\n        book(isbn: String!) : Book\n    }\n";