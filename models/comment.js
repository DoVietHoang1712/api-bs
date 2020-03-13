const {mongoose} = require('../database/database');
const {Verify} = require('./user');
const {Book} = require('./book');
const {Author} = require('./author');
const CommentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    date: {type: Date, default: Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    //Dynamic ref
    commentOn: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Book', 'Author']
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

const AddComment = async (content, id, tokenKey) => {
    try {
        let signInUser = await Verify(tokenKey);
        let book = await Book.findById(id);
        let author = await Author.findById(id);
        if(book) {
            let comment = await Comment.create({
                content: content,
                user: signInUser,
                commentOn: book,
                onModel: 'Book'
            });
            await comment.save();
            await book.comments.push(comment);
            await book.save();
        } else{
            let comment = await Comment.create({
                content: content,
                user: signInUser,
                commentOn: author,
                onModel: 'Author'
            });
            await comment.save();
            await author.comments.push(comment);
            await author.save();
        }
    } catch (error) {
        throw error;
    }
}

const EditComment = async (content, id, tokenKey, idComment) => {
    try {
        let signInUser = await Verify(tokenKey);
        let book = await Book.findById(id);
        let author = await Author.findById(id);
        if(book) {
            let comment = await Comment.findById(idComment);
            if(comment.user.toString() !== signInUser.id){
                throw 'Ban ko the sua';
            } else{
                if(comment.commentOn.toString() !== book.id){
                    throw 'Ban chua comment o day';
                } else{
                    comment.content = content;
                    comment.date = Date.now();
                    await comment.save();
                }
            }
        }
        else{
            let comment = await Comment.findById(idComment);
            if(comment.user.toString() !== signInUser.id){
                throw 'Ban ko the sua';
            } else{
                if(comment.commentOn.toString() !== author.id){
                    throw 'Ban chua comment o day';
                } else{
                    comment.content = content;
                    comment.date = Date.now();
                    await comment.save();
                }
            }
        }
    } catch (error) {
        throw error;
    }
}

const DeleteComment = async (tokenKey, idComment) => {
    try {
        let signInUser = await Verify(tokenKey);
        if(!signInUser){
            throw 'Dang nhap het han';
        } else{
            let comment = await Comment.findById(idComment);
            if(!comment){
                throw 'Khong tim thay comment';
            } else{
                await Comment.deleteOne({_id: comment.id});
                if(comment.onModel === 'Author'){
                    let author = await Author.findOne({_id: comment.commentOn.toString()});
                    author.comments = await author.comments.filter(eachComment => {
                        return eachComment._id.toString() !== comment._id.toString();
                    });
                    await author.save()
                } else{
                    let book = await Book.findOne({_id: comment.commentOn.toString()});
                    book.comments = await book.comments.filter(eachComment => {
                        return eachComment._id.toString() !== comment._id.toString();
                    });
                    await book.save();
                }
            }
        }
    } catch (error) {
        throw error;
    }
}
module.exports = {Comment, AddComment, EditComment, DeleteComment}