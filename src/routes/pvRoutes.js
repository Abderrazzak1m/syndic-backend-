const PvController = require('../controllers/PvController')
const express = require('express');

const router = express.Router();


router.post('/', PvController.createPv);

// GET /api/pv/ag/:assembleeId - Get PV by AG ID
router.get('/ag/:assembleeId', PvController.getPvByAGId);

// GET /api/pv/:id - Get PV by ID
router.get('/:id', PvController.getPvById);

// PUT /api/pv/:id - Update PV
router.put('/:id', PvController.updatePv);

// DELETE /api/pv/:id - Delete PV
router.delete('/:id', PvController.deletePv);

// GET /api/pv/tranche/:trancheId - Get PVs by tranche ID
router.get('/tranche/:trancheId', PvController.getPvsByTrancheId);

module.exports = router;
