const mongoose = require('mongoose');
const User = require('User.js');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    type:{
        type: String,
        required: true,
        default: "post" // Peut aussi être "survey" ou "event"
    },
    user_id:{
        type: Schema.User.ObjectId,
        required: true
    },
    creation_date:{
        type: Date,
        required: true,
        default: Date.now
    },
    // Type : Post
    description:{
        type: String,
        required: true
    },
    img_url:{
        type: String,
        required: false
    },
    // Type : Event
    planned_date:{
        type: Date,
        required: true
    },
    user_list:{
        type: [userSchema],
        required: false
    },
    // Type : Survey
    question:{
        type: String,
        required: true
    },
    response:{
        type: [responseSchema],
        required: true
    },
    end_date:{
        type: Date,
        required: true
    },
});

mongoose.model('post', postSchema);