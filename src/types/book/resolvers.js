export default {
    Book: {
        __description: 'A simple book',
        authors: {
            resolve({ authors }, { count }) {
                return authors ? authors.slice(0, count) : [];
            },
        },

    },
    IndustryIdentifiers: {
        __description: 'Industry identifiers for a Volume',
    },
    Author: {
        __description: 'A volume author',
    },
};
