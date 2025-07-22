const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const lotController = require('../controllers/lotController');

const router = express.Router();

// Get all lots
router.get('/', authenticateToken, lotController.getAllLots);

// Get lot by ID
router.get('/:id', authenticateToken, lotController.getLotById);

// Create lot
router.post('/', authenticateToken, lotController.createLot);

// Update lot
router.put('/:id', authenticateToken, lotController.updateLot);

// Delete lot
router.delete('/:id', authenticateToken, lotController.deleteLot);

module.exports = router;