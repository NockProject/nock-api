const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    alert:{
        type: Boolean,
        required: true,
        default: false
    },
    type:{
        type: String,
        required: true,
        default: "post"
    },
    creationDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    // Type : Post + Event + Fiche
    description:{
        type: String,
        required: true
    },
    // Type : Post + Fiche
    imgUrl:{
        type: String,
        required: false
    },
    // Type : Event + Sondage
    endDate:{
        type: Date,
        required: false
    }
    // TO-DO : reponses
});

module.exports = mongoose.model('Post', postSchema);
