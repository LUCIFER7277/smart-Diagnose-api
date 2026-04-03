const express = require('express');
const router = express.Router();
const diagnosisController = require('../controllers/diagnosisController');

router.post('/diagnose', diagnosisController.diagnose);
router.get('/history', diagnosisController.getHistory);

module.exports = router;
