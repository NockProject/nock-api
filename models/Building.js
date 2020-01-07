const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const buildingSchema = mongoose.Schema({
    address: {type: String, required: true, unique: true},
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    imgUrl: {type: String, required: false},
    // Table linking
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    residents: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

buildingSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Building', buildingSchema);
