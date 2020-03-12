const {mongoose} = require('../database/database');
const {Verify, User} = require('./user');
const AuthorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    // Truong tham chieu
    books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
});

const Author = mongoose.model('Author', AuthorSchema);

const AddAuthor = async (tokenKey, name) => {
    try {
        let signInUser = await Verify(tokenKey);
        let newAuthor = new Author();
        newAuthor.name = name;
        await newAuthor.save();
        await signInUser.authors.push(newAuthor);
        await signInUser.save();
    } catch (error) {
        throw error;
    }
}

const EditAuthor = async (tokenKey, name) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {Author, AddAuthor};