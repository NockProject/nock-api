const mongoose = require('mongoose');

const buildingSchema = mongoose.Schema({
    address:{
        type: String,
        required: true
    },
    geoloc:{
        type: Object,
        required: false
    }
});

module.exports = mongoose.model('Building', buildingSchema);
