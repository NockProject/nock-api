const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        default: "post" // Peut aussi être "survey" ou "event"
    },
    creationDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    // Type : Post
    description:{
        type: String,
        required: true
    },
    imgUrl:{
        type: String,
        required: false
    },
    // Type : Event
    plannedDate:{
        type: Date,
        required: false
    },
    // Type : Survey
    question:{
        type: String,
        required: false
    },
    endDate:{
        type: Date,
        required: false
    },
});

module.exports = mongoose.model('Post', postSchema);


