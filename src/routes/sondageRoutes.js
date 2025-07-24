const express = require('express');
const SondageController = require('../controllers/sondageController')

const router = express.Router();

// POST /api/sondage - Create sondage for an AG
router.post('/', SondageController.createSondage)

// GET /api/sondage/ag/:assembleId - Get sondage by AG ID
router.get('/ag/:assembleId', SondageController.getSondageByAGId);

// POST /api/sondage/vote/:optionId - Vote on an option
router.post('/vote/:optionId', SondageController.voteOnOption);

// GET /api/sondage/results/:sondageId - Get sondage results
router.get('/results/:sondageId', SondageController.getSondageResults);

module.exports = router;