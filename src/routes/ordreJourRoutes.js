const express = require('express');
const OrdreJourController  = require('../controllers/ordreJourController');

const router = express.Router();

// POST /api/ordre-jour - Create Ordre du jour for an AG
router.post('/', OrdreJourController.createOrdreJour);

// GET /api/ordre-jour/ag/:assembleeId - Get Ordre du jour by AG ID
router.get('/ag/:assembleeId', OrdreJourController.getOrdreJourByAGId);

// GET /api/ordre-jour/:id - Get Ordre du jour by ID
router.get('/:id', OrdreJourController.getOrdreJourById);

// PUT /api/ordre-jour/:id - Update Ordre du jour
router.put('/:id', OrdreJourController.updateOrdreJour);

// DELETE /api/ordre-jour/:id - Delete Ordre du jour
router.delete('/:id', OrdreJourController.deleteOrdreJour);

// GET /api/ordre-jour/tranche/:trancheId - Get Ordres du jour by tranche ID
router.get('/tranche/:trancheId', OrdreJourController.getOrdresJourByTrancheId);

module.exports = router;
