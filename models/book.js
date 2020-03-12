const {mongoose} = require('../database/database');
const {Verify} = require('./user');
const {Author} = require('./author');
const BookSchema = new mongoose.Schema({
    name: {type: String, required: true},
    publishDate: {type: String, required: true},
    pageCount: {type: Number, required: true},
    createDate: {type: Date, default: Date.now()},
    // Truong tham chieu
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'}
});

const Book = mongoose.model('Book', BookSchema);

const AddBook = async (name, publishDate, pageCount, tokenKey, id) => {
    try {
        let signInUser = await Verify(tokenKey);
        if(!signInUser){
            throw 'Ban ko co quyen thay doi';
        } else{
            let author = await Author.findById(id);
            if(findAuthor(signInUser.authors, author)){
                let newBook = new Book();
                newBook.name = name;
                newBook.publishDate = publishDate;
                newBook.pageCount = pageCount;
                await newBook.save();
                await author.books.push(newBook);
                await author.save();
                await signInUser.save();
            } else{
                throw 'Ban ko phai chu acc';
            }
        }
    } catch (error) {
        throw error;
    }
}

const findAuthor = async (authors, author) => {
    try {
        authors.forEach((auth) => {
            if(auth.id === author.id) return true;
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {Book, AddBook};