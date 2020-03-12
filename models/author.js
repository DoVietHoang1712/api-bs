const {mongoose} = require('../database/database');
const {Verify, User} = require('./user');
const AuthorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, default: Date.now()},
    // Truong tham chieu
    books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Author = mongoose.model('Author', AuthorSchema);

const AddAuthor = async (tokenKey, name) => {
    try {
        let signInUser = await Verify(tokenKey);
        let newAuthor = new Author();
        newAuthor.name = name;
        newAuthor.owner = signInUser;
        await newAuthor.save();
        await signInUser.authors.push(newAuthor);
        await signInUser.save();
        let foundUser = await User.find({}).populate({
            path: 'authors',
            select: ['name']
        }).exec();
    } catch (error) {
        throw error;
    }
}

const Search = async (text) => {
    try {
        let foundUser = await Author.find({
            name: new RegExp(text, "i")
        }).limit(6).exec();
        return foundUser;
    } catch (error) {
        throw error
    }
}

const EditAuthor = async (tokenKey, name, id) => {
    try {
        let signInUser = await Verify(tokenKey);
        let author = await signInUser.authors.find({_id: id});
        if(author.length > 0){
            author.name = name;
            author.date = new Date.now();
            await author.save();
            await signInUser.save();
        }
    } catch (error) {
        throw error;
    }
}

const DeleteAuthor = async (tokenKey, id) => {
    try {
        let signInUser = await Verify(tokenKey);
        let author = await Author.findById(id);
        await Author.deleteOne({_id: id});
        signInUser.authors = await signInUser.authors.filter(eachAuthor => {
            return eachAuthor._id.toString() !== author._id.toString(); 
        });
        await signInUser.save();
    } catch (error) {
        throw error;
    }
}
module.exports = {Author, AddAuthor, Search, EditAuthor, DeleteAuthor};