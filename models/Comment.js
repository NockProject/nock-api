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
    }
});

module.exports = mongoose.model('Comment', commentSchema);
