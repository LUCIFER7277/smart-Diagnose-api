const mongoose = require('mongoose');

const ConditionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    probability: {
        type: Number,
        required: true
    },
    next_steps: {
        type: String,
        required: true
    }
}, { _id: false });

const DiagnosisSchema = new mongoose.Schema({
    symptoms: {
        type: String,
        required: true
    },
    conditions: [ConditionSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Diagnosis', DiagnosisSchema);
