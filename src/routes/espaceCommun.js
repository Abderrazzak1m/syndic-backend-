const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const espaceCommunController = require('../controllers/espaceCommunController');

const router = express.Router();

// Get all espaces communs
router.get('/', authenticateToken, espaceCommunController.getAllEspacesCommuns);

// Get espace commun by ID
router.get('/:id', authenticateToken, espaceCommunController.getEspaceCommunById);

// Create espace commun
router.post('/', authenticateToken, espaceCommunController.createEspaceCommun);

// Update espace commun
router.put('/:id', authenticateToken, espaceCommunController.updateEspaceCommun);

// Delete espace commun
router.delete('/:id', authenticateToken, espaceCommunController.deleteEspaceCommun);

// Get espaces communs by tranche ID
router.get('/tranche/:id', authenticateToken, espaceCommunController.getEspacesCommunsByTrancheId);

module.exports = router;
