const SondageService = require('../services/sondageService')

class SondageController {
  // Create sondage for an AG
  async createSondage(req, res) {
    try {
      const { assembleId, enonceSondage, optionsDate, dureeHeures } = req.body;

      // Validation
      if (!assembleId || !optionsDate || !Array.isArray(optionsDate) || optionsDate.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Les champs assembleId et optionsDate sont obligatoires'
        });
      }

      // Validate options format
      for (const option of optionsDate) {
        if (!option.dateProposee || !option.heureProposee) {
          return res.status(400).json({
            success: false,
            message: 'Chaque option doit contenir dateProposee et heureProposee'
          });
        }
      }

      const sondage = await SondageService.createSondage({
        assembleId,
        enonceSondage,
        optionsDate,
        dureeHeures
      });

      res.status(201).json({
        success: true,
        message: 'Sondage créé avec succès',
        data: sondage
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get sondage by AG ID
  async getSondageByAGId(req, res) {
    try {
      const { assembleId } = req.params;

      if (!assembleId || isNaN(parseInt(assembleId))) {
        return res.status(400).json({
          success: false,
          message: 'ID de l\'AG invalide'
        });
      }

      const sondage = await SondageService.getSondageByAGId(assembleId);

      res.status(200).json({
        success: true,
        message: 'Sondage récupéré avec succès',
        data: sondage
      });
    } catch (error) {
      const status = error.message.includes('non trouvé') ? 404 : 500;
      res.status(status).json({
        success: false,
        message: error.message
      });
    }
  }

  // Vote on option
  async voteOnOption(req, res) {
    try {
      const { optionId } = req.params;

      if (!optionId || isNaN(parseInt(optionId))) {
        return res.status(400).json({
          success: false,
          message: 'ID de l\'option invalide'
        });
      }

      const option = await SondageService.voteOnOption(optionId);

      res.status(200).json({
        success: true,
        message: 'Vote enregistré avec succès',
        data: option
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get sondage results
  async getSondageResults(req, res) {
    try {
      const { sondageId } = req.params;

      if (!sondageId || isNaN(parseInt(sondageId))) {
        return res.status(400).json({
          success: false,
          message: 'ID du sondage invalide'
        });
      }

      const results = await SondageService.getSondageResults(sondageId);

      res.status(200).json({
        success: true,
        message: 'Résultats du sondage récupérés avec succès',
        data: results
      });
    } catch (error) {
      const status = error.message.includes('non trouvé') ? 404 : 500;
      res.status(status).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports =  new SondageController();
