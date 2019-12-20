const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: false
    },
    postId:{
        type: String,
        required: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Comment', commentSchema);
