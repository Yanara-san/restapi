const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true 
    },
}, {
    collection: 'contents',
    timestamps: true,
});

module.exports = mongoose.model('Contents', schema);