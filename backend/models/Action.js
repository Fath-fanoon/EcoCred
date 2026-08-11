const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    imageUrl: { type: String },
    gps: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Action', actionSchema); 