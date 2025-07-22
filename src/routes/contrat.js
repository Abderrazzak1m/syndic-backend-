const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const contratController = require('../controllers/contratController');

const router = express.Router();

// Get contrats by copropriete ID
router.get('/copropriete/:id', authenticateToken, contratController.getContratsByCoproprieteId);

// Create contrat
router.post('/', authenticateToken, contratController.createContrat);

// Update contrat
router.put('/:id', authenticateToken, contratController.updateContrat);

module.exports = router;
