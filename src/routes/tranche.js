const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const trancheController = require('../controllers/trancheController');

const router = express.Router();

// Get all tranches
router.get('/', authenticateToken, trancheController.getAllTranches);

// Get tranche by ID
router.get('/:id', authenticateToken, trancheController.getTrancheById);

// Get immeubles by tranche ID
router.get('/:id/immeubles', authenticateToken, trancheController.getImmeublesByTrancheId);

// Create tranche
router.post('/', authenticateToken, trancheController.createTranche);

// Update tranche
router.put('/:id', authenticateToken, trancheController.updateTranche);

// Delete tranche
router.delete('/:id', authenticateToken, trancheController.deleteTranche);

module.exports = router;