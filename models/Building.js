const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buildingSchema = mongoose.Schema({
    address:{
        type: String,
        required: true
    },
    feed:{
        type: Array,
        required: false
    },
    geoloc:{
        type: Object,
        required: false
    },
    dashboard:{
        type: Object,
        required: false
    },
    residents:{
        type: Array,
        required: false
    }
});

mongoose.model('building', buildingSchema);
