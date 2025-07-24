// routes/assembleeGeneraleRoutes.js
const express = require('express');
const AssembleeGeneraleController  = require('../controllers/assembleeGeneraleController');
const { authenticateToken } = require('../middleware/auth');


const router = express.Router();

// POST /api/assemblee-generale - Create new AG
router.post('/', authenticateToken, AssembleeGeneraleController.createAG);

// GET /api/assemblee-generale/tranche/:trancheId - Get AGs by tranche ID
router.get('/tranche/:trancheId', authenticateToken, AssembleeGeneraleController.getAGsByTrancheId);

router.get('/', authenticateToken, AssembleeGeneraleController.getAllAGs);

router.put('/:id/convocation', authenticateToken, AssembleeGeneraleController.updateConvocationController);

module.exports = router;

