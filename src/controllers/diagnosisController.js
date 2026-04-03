const Diagnosis = require('../models/Diagnosis');
const aiService = require('../services/aiService');
const asyncWrap = require('../errors/asyncWrap');


exports.diagnose = asyncWrap(async (req, res) => {
    const { symptoms } = req.body;

    if (!symptoms || typeof symptoms !== 'string') {
        return res.status(400).json({ error: 'Please provide symptoms as a string.' });
    }

    const conditions = await aiService.getDiagnosisFromAI(symptoms);

    const diagnosisRecord = new Diagnosis({
        symptoms,
        conditions
    });
    await diagnosisRecord.save();

    res.json({
        symptoms: diagnosisRecord.symptoms,
        conditions: diagnosisRecord.conditions,
        id: diagnosisRecord._id
    });
});

exports.getHistory = asyncWrap(async (req, res) => {
    const history = await Diagnosis.find().sort({ createdAt: -1 });
    res.json(history);
});
