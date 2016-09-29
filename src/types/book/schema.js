export default `
    type Book {
        id: ID!,
        title: String!
        industryIdentifiers: IndustryIdentifiers
        authors(count: Int): [Author]
        imageLinks: BookImageLinks
    }
    
    type IndustryIdentifiers {
        isbn10: String
        isbn13: String
        other: String
    }
    
    type Author {
        name: String!
    }

    type BookImageLinks {
        smallThumbnail: String
        thumbnail: String
    }
`;

