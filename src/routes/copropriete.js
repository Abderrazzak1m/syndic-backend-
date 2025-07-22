const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const coproprieteController = require('../controllers/coproprieteController');

const router = express.Router();

// Get all coproprietes
router.get('/', authenticateToken, coproprieteController.getAllCoproprietes);

// Get copropriete by ID
router.get('/:id', authenticateToken, coproprieteController.getCoproprieteById);

// Get tranches by copropriete ID
router.get('/:id/tranches', authenticateToken, coproprieteController.getTranchesByCoproprieteId);

// Create copropriete
router.post('/', authenticateToken, coproprieteController.createCopropriete);

// Update copropriete
router.put('/:id', authenticateToken, coproprieteController.updateCopropriete);

// Delete copropriete
router.delete('/:id', authenticateToken, coproprieteController.deleteCopropriete);

module.exports = router;
