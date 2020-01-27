var mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    _userId:   { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'usermodel' },
    token:     { type: String,    required: true },
    createdAt: { type: Date,      required: true, default: Date.now, expires: 43200 }
});


var Token = module.exports = mongoose.model('Token',tokenSchema);