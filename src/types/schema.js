export default `
    type Query {
        books(search: String!) : [Book]
        book(isbn: String!) : Book
    }
`;
