const mongoose = require('mongoose');
const User = require('User.js');
const Schema = mongoose.Schema;

const responseSchema = mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    sum_responses:{
        type: int,
        required: false
    },
    user_responses:{
        type: [Schema.User.ObjectId], // A confirmer
        required: false
    },
});

mongoose.model('response', buildingSchema);