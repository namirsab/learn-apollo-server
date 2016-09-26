export default `
    type Query {
        books(search: String!, maxResults: Int = 10) : [Book]
        book(isbn: String!) : Book
    }
`;
