const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    alert: {type: Boolean, required: true, default: false},
    type: {type: String, required: true, enum: ['post', 'fiche', 'survey', 'event'], default: "post"},
    creationDate: {type: Date, required: true, default: Date.now},
    // Type : Post + Event + Fiche
    description: {type: String, required: true},
    // Type : Post + Fiche
    imgUrl: {type: String, required: false},
    // Type : Event + survey
    endDate: {type: Date, required: false},
    // Table linking
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    buildingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Building'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
    // TO-DO : survey
});
postSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Post', postSchema);
