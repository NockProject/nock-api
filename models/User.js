const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    lastName: {type: String, require:true},
    firstName: {type: String, require:true},
    email: {type: String, require: true, unique: true },
    password: {type: String, require: true},
    isAdmin: {type: Boolean, require: true},
    // imageUrl: {type: String, require:false, default: ''},
    // Table linking
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    buildingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Building'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
