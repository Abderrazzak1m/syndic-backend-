const PvService = require('../services/pvService')

class PvController {
  // Create PV for an AG
  async createPv(req, res) {
    try {
      const { assembleeId, enonce, contenu } = req.body;

      // Validation
      if (!assembleeId || !contenu) {
        return res.status(400).json({
          success: false,
          message: 'Les champs assembleeId et contenu sont obligatoires'
        });
      }

      const pv = await PvService.createPv({
        assembleeId,
        enonce,
        contenu
      });

      res.status(201).json({
        success: true,
        message: 'PV créé avec succès',
        data: pv
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get PV by AG ID
  async getPvByAGId(req, res) {
    try {
      const { assembleeId } = req.params;

      if (!assembleeId || isNaN(parseInt(assembleeId))) {
        return res.status(400).json({
          success: false,
          message: 'ID de l\'AG invalide'
        });
      }

      const pv = await PvService.getPvByAGId(assembleeId);

      res.status(200).json({
        success: true,
        message: 'PV récupéré avec succès',
        data: pv
      });
    } catch (error) {
      const status = error.message.includes('non trouvé') ? 404 : 500;
      res.status(status).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get PV by ID
  async getPvById(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: 'ID du PV invalide'
        });
      }

      const pv = await PvService.getPvById(id);

      res.status(200).json({
        success: true,
        message: 'PV récupéré avec succès',
        data: pv
      });
    } catch (error) {
      const status = error.message.includes('non trouvé') ? 404 : 500;
      res.status(status).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update PV
  async updatePv(req, res) {
    try {
      const { id } = req.params;
      const { enonce, contenu } = req.body;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: 'ID du PV invalide'
        });
      }

      const pv = await PvService.updatePv(id, { enonce, contenu });

      res.status(200).json({
        success: true,
        message: 'PV mis à jour avec succès',
        data: pv
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Delete PV
  async deletePv(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: 'ID du PV invalide'
        });
      }

      const result = await PvService.deletePv(id);

      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get PVs by tranche ID
  async getPvsByTrancheId(req, res) {
    try {
      const { trancheId } = req.params;

      if (!trancheId || isNaN(parseInt(trancheId))) {
        return res.status(400).json({
          success: false,
          message: 'ID de tranche invalide'
        });
      }

      const pvs = await PvService.getPvsByTrancheId(trancheId);

      res.status(200).json({
        success: true,
        message: 'Liste des PVs récupérée avec succès',
        data: pvs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new PvController()