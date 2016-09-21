export default `
    type Book {
        title: String!
        industryIdentifiers: IndustryIdentifiers
    }
    
    type IndustryIdentifiers {
        isbn10: String
        isbn13: String
        other: String
    }
`;

