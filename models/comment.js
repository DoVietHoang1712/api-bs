const {mongoose} = require('../database/database');

const CommentSchema = new mongoose.Schema({
    content: {type: String, required: true},
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