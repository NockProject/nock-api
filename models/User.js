const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema =mongoose.Schema({
    lastName: {type: String, require:true},
    firstName: {type: String, require:true},
    email: {type: String, require: true, unique: true },
    password: { type: String, require: true},
    isAdmin:{type: Boolean, require: true},
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
