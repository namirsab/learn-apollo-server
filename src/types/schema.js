export default `
    type Query {
        books(search: String!, maxResults: Int = 10, startIndex: Int = 0) : [Book]
        book(isbn: String!) : Book
    }
`;
