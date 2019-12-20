const mongoose = require('mongoose');
const User = require('../models/User');
const Schema = mongoose.Schema;

const buildingSchema = mongoose.Schema({
    address:{
        type: String,
        required: true
    },
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
    geoloc:{
        type: Object,
        required: false
    },
    Users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Building', buildingSchema);
