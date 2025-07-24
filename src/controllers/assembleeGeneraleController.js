// controllers/assembleeGeneraleController.js
const e = require('express');
const  AssembleeGeneraleService = require('../services/assembleeGeneraleService');

class AssembleeGeneraleController {
  // Create new AG
  async createAG(req, res) {
    try {
      const { trancheId, enonce, description } = req.body;

      // Validation
      if (!trancheId || !enonce) {
        return res.status(400).json({
          success: false,
          message: 'Les champs trancheId et enonce sont obligatoires'
        });
      }

      const ag = await AssembleeGeneraleService.createAG({
        trancheId,
        enonce,
        description
      });

      res.status(201).json({
        success: true,
        message: 'Assemblée Générale créée avec succès',
        data: ag
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get AGs by tranche ID
  async getAGsByTrancheId(req, res) {
    try {
      const { trancheId } = req.params;

      if (!trancheId || isNaN(parseInt(trancheId))) {
        return res.status(400).json({
          success: false,
          message: 'ID de tranche invalide'
        });
      }

      const ags = await AssembleeGeneraleService.getAGsByTrancheId(trancheId);

      res.status(200).json({
        success: true,
        message: 'Liste des Assemblées Générales récupérée avec succès',
        data: ags
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getAllAGs(req, res) {
    try {
      const ags = await AssembleeGeneraleService.getAllAGs();

      res.status(200).json({
        success: true,
        message: 'Liste de toutes les Assemblées Générales récupérée avec succès',
        data: ags
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
 }
// Update convocation document for an AG using updateConvocation service
 async updateConvocationController(req, res) {
  try {
    const { id } = req.params;
    const { enonce } = req.body;
    console.log('Received convocation:', id, enonce);
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: 'ID d\'Assemblée Générale invalide'
      });
    }

    if (!enonce || enonce.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Le document de convocation est obligatoire'
      });
    }

    const updatedAG = await AssembleeGeneraleService.updateConvocation(id, enonce);

    res.status(200).json({
      success: true,
      message: 'Convocation mise à jour avec succès',
      data: updatedAG
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
 }
}

module.exports =  new AssembleeGeneraleController()