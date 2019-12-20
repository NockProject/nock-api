const mongoose = require('mongoose');

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
    imgUrl:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Building', buildingSchema);
