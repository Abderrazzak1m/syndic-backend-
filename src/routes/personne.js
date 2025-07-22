const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const personneController = require('../controllers/personneController');

const router = express.Router();

// Get all personnes
router.get('/', authenticateToken, personneController.getAllPersonnes);

// Get personnes by type (locataire or coproprietaire)
router.get('/type/:type', authenticateToken, personneController.getPersonnesByType);

// Get personnes by copropriete
router.get('/copropriete/:coproprieteId', authenticateToken, personneController.getPersonnesByCopropriete);

// Get personne by ID
router.get('/:id', authenticateToken, personneController.getPersonneById);

// Create personne
router.post('/', authenticateToken, personneController.createPersonne);

// Update personne
router.put('/:id', authenticateToken, personneController.updatePersonne);

// Delete personne
router.delete('/:id', authenticateToken, personneController.deletePersonne);

// Get locataires by copropriete
router.get('/copropriete/:coproprieteId/locataires', authenticateToken, personneController.getLocataires);

// Get coproprietaires by copropriete
router.get('/copropriete/:coproprieteId/coproprietaires', authenticateToken, personneController.getCoproprietaires);

module.exports = router;
