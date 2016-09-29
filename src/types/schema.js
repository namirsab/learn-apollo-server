export default `

    type BookSearchResult {
        totalItems: Int!
        results: [Book]
    }

    type Query {
        books(search: String!, maxResults: Int = 10, startIndex: Int = 0) : BookSearchResult!
        book(isbn: String!) : Book
    }
`;
