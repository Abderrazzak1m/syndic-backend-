const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const demandeLocationController = require('../controllers/demandeLocationController');

const router = express.Router();

// Get all demandes location
router.get('/', authenticateToken, demandeLocationController.getAllDemandesLocation);

// Get demandes by status
router.get('/status/:status', authenticateToken, demandeLocationController.getDemandesByStatus);

// Get demande location by ID
router.get('/:id', authenticateToken, demandeLocationController.getDemandeLocationById);

// Create demande location
router.post('/', authenticateToken, demandeLocationController.createDemandeLocation);

// Update demande status (accept/refuse)
router.put('/:id/status', authenticateToken, demandeLocationController.updateDemandeLocationStatus);

module.exports = router;