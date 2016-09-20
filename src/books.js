export default count => {
    const books = [];
    for (let i = 0; i < count; ++i) {
        books.push({
            title: `Book ${i}`,
            code: Math.random().toString()
        });
    }
    
    return books;
};