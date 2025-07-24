const OrdreJourService  = require('../services/ordreJourService')

class OrdreJourController {
  // Create Ordre du jour for an AG
  async createOrdreJour(req, res) {
    try {
      const { assembleeId, objetOrdreJour, texteOrdreJour } = req.body;

      // Validation
      if (!assembleeId || !objetOrdreJour || !texteOrdreJour) {
        return res.status(400).json({
          success: false,
          message: 'Les champs assembleeId, objetOrdreJour et texteOrdreJour sont obligatoires'
        });
      }

      const ordreJour = await OrdreJourService.createOrdreJour({
        assembleeId,
        objetOrdreJour,
        texteOrdreJour
      });

      res.status(201).json({
        success: true,
        message: 'Ordre du jour créé avec succès',
        data: ordreJour
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get Ordre du jour by AG ID
  async getOrdreJourByAGId(req, res) {
    try {
      const { assembleeId } = req.params;

      if (!assembleeId || isNaN(parseInt(assembleeId))) {
        return res.status(400).json({
          success: false,
          message: 'ID de l\'AG invalide'
        });
      }

      const ordreJour = await OrdreJourService.getOrdreJourByAGId(assembleeId);

      res.status(200).json({
        success: true,
        message: 'Ordre du jour récupéré avec succès',
        data: ordreJour
      });
    } catch (error) {
      const status = error.message.includes('non trouvé') ? 404 : 500;
      res.status(status).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get Ordre du jour by ID
  async getOrdreJourById(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: 'ID de l\'ordre du jour invalide'
        });
      }

      const ordreJour = await OrdreJourService.getOrdreJourById(id);

      res.status(200).json({
        success: true,
        message: 'Ordre du jour récupéré avec succès',
        data: ordreJour
      });
    } catch (error) {
      const status = error.message.includes('non trouvé') ? 404 : 500;
      res.status(status).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update Ordre du jour
  async updateOrdreJour(req, res) {
    try {
      const { id } = req.params;
      const { objetOrdreJour, texteOrdreJour } = req.body;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: 'ID de l\'ordre du jour invalide'
        });
      }

      const ordreJour = await OrdreJourService.updateOrdreJour(id, { objetOrdreJour, texteOrdreJour });

      res.status(200).json({
        success: true,
        message: 'Ordre du jour mis à jour avec succès',
        data: ordreJour
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Delete Ordre du jour
  async deleteOrdreJour(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: 'ID de l\'ordre du jour invalide'
        });
      }

      const result = await OrdreJourService.deleteOrdreJour(id);

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

  // Get Ordres du jour by tranche ID
  async getOrdresJourByTrancheId(req, res) {
    try {
      const { trancheId } = req.params;

      if (!trancheId || isNaN(parseInt(trancheId))) {
        return res.status(400).json({
          success: false,
          message: 'ID de tranche invalide'
        });
      }

      const ordresJour = await OrdreJourService.getOrdresJourByTrancheId(trancheId);

      res.status(200).json({
        success: true,
        message: 'Liste des ordres du jour récupérée avec succès',
        data: ordresJour
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}


module.exports = new OrdreJourController()