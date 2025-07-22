const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const immeubleController = require('../controllers/immeubleController');

const router = express.Router();

// Get all immeubles
router.get('/', authenticateToken, immeubleController.getAllImmeubles);

// Get immeuble by ID
router.get('/:id', authenticateToken, immeubleController.getImmeubleById);

// Get lots by immeuble ID
router.get('/:id/lots', authenticateToken, immeubleController.getLotsByImmeubleId);

// Create immeuble
router.post('/', authenticateToken, immeubleController.createImmeuble);

// Update immeuble
router.put('/:id', authenticateToken, immeubleController.updateImmeuble);

// Delete immeuble
router.delete('/:id', authenticateToken, immeubleController.deleteImmeuble);

module.exports = router;