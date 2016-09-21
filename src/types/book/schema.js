export default `
    type Book {
        title: String!
        industryIdentifiers: IndustryIdentifiers
        authors(count: Int): [Author]
    }
    
    type IndustryIdentifiers {
        isbn10: String
        isbn13: String
        other: String
    }
    
    type Author {
        name: String!
    }
`;
